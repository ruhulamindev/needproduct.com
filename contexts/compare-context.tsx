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

interface CompareItem {
  id: string
  name: string
  price: number
  image: string
  discount?: number
  originalPrice?: number
  category: string
  rating: number
  reviews: number
  inStock: boolean
}

interface CompareState {
  items: CompareItem[]
}

type CompareAction =
  | { type: "ADD_ITEM"; payload: CompareItem }
  | { type: "REMOVE_ITEM"; payload: string }
  | { type: "CLEAR_COMPARE" }
  | { type: "LOAD"; payload: CompareItem[] }

const CompareContext = createContext<{
  items: CompareItem[]
  isLoaded: boolean
  addItem: (item: CompareItem) => boolean // 👈 boolean
  removeItem: (id: string) => void
  clearCompare: () => void
  isInCompare: (id: string) => boolean
} | null>(null)

function compareReducer(state: CompareState, action: CompareAction): CompareState {
  switch (action.type) {
    case "ADD_ITEM": {
      if (state.items.find((item) => item.id === action.payload.id)) return state
      if (state.items.length >= 4) {
        return { items: [...state.items.slice(1), action.payload] }
      }
      return { items: [...state.items, action.payload] }
    }
    case "REMOVE_ITEM":
      return { items: state.items.filter((item) => item.id !== action.payload) }
    case "CLEAR_COMPARE":
      return { items: [] }
    case "LOAD":
      return { items: action.payload }
    default:
      return state
  }
}

export function CompareProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth()
  const [state, dispatch] = useReducer(compareReducer, { items: [] })
  const [isLoaded, setIsLoaded] = useState(false)

  const storageKey = user ? `compare_user_${user.id}` : null

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
      console.error("Compare load failed:", err)
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

  const addItem = (item: CompareItem): boolean => {
    if (!user) return false
    dispatch({ type: "ADD_ITEM", payload: item })
    return true
  }
  const removeItem = (id: string) => dispatch({ type: "REMOVE_ITEM", payload: id })
  const clearCompare = () => dispatch({ type: "CLEAR_COMPARE" })
  const isInCompare = (id: string) => state.items.some((item) => item.id === id)

  return (
    <CompareContext.Provider
      value={{ items: state.items, isLoaded, addItem, removeItem, clearCompare, isInCompare }}
    >
      {children}
    </CompareContext.Provider>
  )
}

export function useCompare() {
  const context = useContext(CompareContext)
  if (!context) throw new Error("useCompare must be used within a CompareProvider")
  return context
}