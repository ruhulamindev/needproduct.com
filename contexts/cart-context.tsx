"use client"

import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useState,
  type ReactNode,
} from "react"

interface CartItem {
  id: string
  name: string
  price: number
  image: string
  quantity: number
  size?: string
  color?: string
}

interface CartState {
  items: CartItem[]
  total: number
}

type CartAction =
  | { type: "ADD_ITEM"; payload: CartItem }
  | { type: "REMOVE_ITEM"; payload: string }
  | { type: "UPDATE_QUANTITY"; payload: { id: string; quantity: number } }
  | { type: "CLEAR_CART" }
  | { type: "LOAD"; payload: CartItem[] }

const CartContext = createContext<{
  items: CartItem[]
  total: number
  isLoaded: boolean // 👈 নতুন
  addItem: (item: CartItem) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
} | null>(null)

function calculateTotal(items: CartItem[]) {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0)
}

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      )
      let updatedItems: CartItem[]
      if (existingItem) {
        updatedItems = state.items.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item
        )
      } else {
        updatedItems = [...state.items, action.payload]
      }
      return { items: updatedItems, total: calculateTotal(updatedItems) }
    }
    case "REMOVE_ITEM": {
      const filteredItems = state.items.filter(
        (item) => item.id !== action.payload
      )
      return { items: filteredItems, total: calculateTotal(filteredItems) }
    }
    case "UPDATE_QUANTITY": {
      const updatedItems = state.items
        .map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        )
        .filter((item) => item.quantity > 0)
      return { items: updatedItems, total: calculateTotal(updatedItems) }
    }
    case "CLEAR_CART":
      return { items: [], total: 0 }
    case "LOAD":
      return { items: action.payload, total: calculateTotal(action.payload) }
    default:
      return state
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [], total: 0 })
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    try {
      const saved = localStorage.getItem("cart")
      if (saved) dispatch({ type: "LOAD", payload: JSON.parse(saved) })
    } catch (err) {
      console.error("Cart load failed:", err)
    } finally {
      setIsLoaded(true)
    }
  }, [])

  useEffect(() => {
    if (!isLoaded) return
    localStorage.setItem("cart", JSON.stringify(state.items))
  }, [state.items, isLoaded])

  const addItem = (item: CartItem) => {
    if (item.quantity <= 0) return
    dispatch({ type: "ADD_ITEM", payload: item })
  }
  const removeItem = (id: string) =>
    dispatch({ type: "REMOVE_ITEM", payload: id })
  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 0) return
    dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } })
  }
  const clearCart = () => dispatch({ type: "CLEAR_CART" })

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        total: state.total,
        isLoaded, // 👈 নতুন
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}