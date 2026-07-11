"use client"

import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useState,
  type ReactNode,
} from "react"
import { useAuth } from "@/contexts/auth-context"

interface WishlistItem {
  id: string
  name: string
  price: number
  image: string
  originalPrice?: number
}

interface WishlistState {
  items: WishlistItem[]
}

type WishlistAction =
  | { type: "ADD_ITEM"; payload: WishlistItem }
  | { type: "REMOVE_ITEM"; payload: string }
  | { type: "CLEAR_WISHLIST" }
  | { type: "LOAD"; payload: WishlistItem[] }

const WishlistContext = createContext<{
  items: WishlistItem[]
  isLoaded: boolean
  addItem: (item: WishlistItem) => boolean // 👈 boolean
  removeItem: (id: string) => void
  clearWishlist: () => void
  isInWishlist: (id: string) => boolean
} | null>(null)

function wishlistReducer(state: WishlistState, action: WishlistAction): WishlistState {
  switch (action.type) {
    case "ADD_ITEM": {
      if (state.items.find((item) => item.id === action.payload.id)) return state
      return { items: [...state.items, action.payload] }
    }
    case "REMOVE_ITEM":
      return { items: state.items.filter((item) => item.id !== action.payload) }
    case "CLEAR_WISHLIST":
      return { items: [] }
    case "LOAD":
      return { items: action.payload }
    default:
      return state
  }
}

export function WishlistProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth()
  const [state, dispatch] = useReducer(wishlistReducer, { items: [] })
  const [isLoaded, setIsLoaded] = useState(false)

  const storageKey = user ? `wishlist_user_${user.id}` : null

  useEffect(() => {
    setIsLoaded(false)
    if (!storageKey) {
      dispatch({ type: "LOAD", payload: [] })
      setIsLoaded(true)
      return
    }
    try {
      const saved = localStorage.getItem(storageKey)
      dispatch({ type: "LOAD", payload: saved ? JSON.parse(saved) : [] })
    } catch (err) {
      console.error("Wishlist load failed:", err)
      dispatch({ type: "LOAD", payload: [] })
    } finally {
      setIsLoaded(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storageKey])

  useEffect(() => {
    if (!isLoaded || !storageKey) return
    localStorage.setItem(storageKey, JSON.stringify(state.items))
  }, [state.items, isLoaded, storageKey])

  const addItem = (item: WishlistItem): boolean => {
    if (!user) return false
    dispatch({ type: "ADD_ITEM", payload: item })
    return true
  }
  const removeItem = (id: string) => dispatch({ type: "REMOVE_ITEM", payload: id })
  const clearWishlist = () => dispatch({ type: "CLEAR_WISHLIST" })
  const isInWishlist = (id: string) => state.items.some((item) => item.id === id)

  return (
    <WishlistContext.Provider
      value={{ items: state.items, isLoaded, addItem, removeItem, clearWishlist, isInWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  const context = useContext(WishlistContext)
  if (!context) throw new Error("useWishlist must be used within a WishlistProvider")
  return context
}