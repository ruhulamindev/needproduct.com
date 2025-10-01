// types/user.ts

export interface User {
  id: string
  name: string
  email: string
  createdAt: string
  updatedAt: string
  isActive: boolean
  profilePicture?: string
  phoneNumber?: string
}
