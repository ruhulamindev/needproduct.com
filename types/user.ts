// types/user.ts
export interface User {
  id: string
  name: string
  email: string
  phoneNumber?: string
  profilePicture?: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}