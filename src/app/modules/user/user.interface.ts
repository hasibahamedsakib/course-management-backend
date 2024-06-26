import { Model } from 'mongoose'
import { USER_ROLE } from './user.constant'

export interface TUser {
  _id: string
  username: string
  email: string
  password: string
  role: 'admin' | 'user'
}

export interface TLoginUser {
  username: string
  password: string
}
export interface TChangePass {
  currentPassword: string
  newPassword: string
}

export interface UserModel extends Model<TUser> {
  isUserExistByUsername(username: string): Promise<TUser>
}
export interface UserModel extends Model<TUser> {
  isUserExistByEmail(email: string): Promise<TUser>
}

export type TUserRole = keyof typeof USER_ROLE
