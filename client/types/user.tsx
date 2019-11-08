export type User = {
  _id: string
  firstName?: string
  lastName?: string
  isAdmin: boolean
  isPropertyOwner: boolean
  isLoggedIn: boolean
  email: string
  passwordReset?: boolean
  companyId?: string
}
