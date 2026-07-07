"use client"

import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useState,
  type ReactNode,
} from "react"

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
  isLoaded: boolean // 👈 নতুন
  addItem: (item: WishlistItem) => void
  removeItem: (id: string) => void
  clearWishlist: () => void
  isInWishlist: (id: string) => boolean
} | null>(null)

function wishlistReducer(
  state: WishlistState,
  action: WishlistAction
): WishlistState {
  switch (action.type) {
    case "ADD_ITEM": {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      )
      if (existingItem) return state
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
  const [state, dispatch] = useReducer(wishlistReducer, { items: [] })
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    try {
      const saved = localStorage.getItem("wishlist")
      if (saved) dispatch({ type: "LOAD", payload: JSON.parse(saved) })
    } catch (err) {
      console.error("Wishlist load failed:", err)
    } finally {
      setIsLoaded(true)
    }
  }, [])

  useEffect(() => {
    if (!isLoaded) return
    localStorage.setItem("wishlist", JSON.stringify(state.items))
  }, [state.items, isLoaded])

  const addItem = (item: WishlistItem) =>
    dispatch({ type: "ADD_ITEM", payload: item })
  const removeItem = (id: string) =>
    dispatch({ type: "REMOVE_ITEM", payload: id })
  const clearWishlist = () => dispatch({ type: "CLEAR_WISHLIST" })
  const isInWishlist = (id: string) =>
    state.items.some((item) => item.id === id)

  return (
    <WishlistContext.Provider
      value={{
        items: state.items,
        isLoaded, // 👈 নতুন
        addItem,
        removeItem,
        clearWishlist,
        isInWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  const context = useContext(WishlistContext)
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider")
  }
  return context
}