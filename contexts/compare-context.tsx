"use client"

import { createContext, useContext, useReducer, type ReactNode } from "react"

interface CompareItem {
  id: string
  name: string
  price: number
  image: string
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

const CompareContext = createContext<{
  items: CompareItem[]
  addItem: (item: CompareItem) => void
  removeItem: (id: string) => void
  clearCompare: () => void
  isInCompare: (id: string) => boolean
} | null>(null)

function compareReducer(state: CompareState, action: CompareAction): CompareState {
  switch (action.type) {
    case "ADD_ITEM": {
      const existingItem = state.items.find((item) => item.id === action.payload.id)
      if (existingItem) {
        return state // Item already in compare
      }

      // Limit to 4 items for comparison
      if (state.items.length >= 4) {
        return {
          items: [...state.items.slice(1), action.payload],
        }
      }

      return {
        items: [...state.items, action.payload],
      }
    }

    case "REMOVE_ITEM": {
      return {
        items: state.items.filter((item) => item.id !== action.payload),
      }
    }

    case "CLEAR_COMPARE":
      return { items: [] }

    default:
      return state
  }
}

export function CompareProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(compareReducer, { items: [] })

  const addItem = (item: CompareItem) => {
    dispatch({ type: "ADD_ITEM", payload: item })
  }

  const removeItem = (id: string) => {
    dispatch({ type: "REMOVE_ITEM", payload: id })
  }

  const clearCompare = () => {
    dispatch({ type: "CLEAR_COMPARE" })
  }

  const isInCompare = (id: string) => {
    return state.items.some((item) => item.id === id)
  }

  return (
    <CompareContext.Provider
      value={{
        items: state.items,
        addItem,
        removeItem,
        clearCompare,
        isInCompare,
      }}
    >
      {children}
    </CompareContext.Provider>
  )
}

export function useCompare() {
  const context = useContext(CompareContext)
  if (!context) {
    throw new Error("useCompare must be used within a CompareProvider")
  }
  return context
}
