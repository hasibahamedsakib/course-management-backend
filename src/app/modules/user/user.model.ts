/* eslint-disable @typescript-eslint/no-this-alias */
import { Schema, model } from 'mongoose'
import { TUser, UserModel } from './user.interface'
import bcrypt from 'bcrypt'
import config from '../../config'
import { History } from './userPasswordHistory'

const userSchema = new Schema<TUser, UserModel>(
  {
    username: {
      type: String,
      unique: true,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: 0,
    },
    role: {
      type: String,
      default: 'user',
    },
  },
  {
    timestamps: true,
  },
)

// storing hash password into db
userSchema.pre('save', async function () {
  const user = this

  user.password = await bcrypt.hash(user.password, Number(config.salt_rounds))
})
userSchema.post('save', async function (doc, next) {
  await History.create({
    userId: doc._id,
    password: doc.password,
  })

  next()
})
// creating a static method by email
userSchema.statics.isUserExistByUsername = async function (username: string) {
  const existingUser = await User.findOne({ username }).select('+password')
  return existingUser
}
// creating a static method by email
userSchema.statics.isUserExistByEmail = async function (email: string) {
  const existingUser = await User.findOne({ email }).select('+password')
  return existingUser
}

export const User = model<TUser, UserModel>('User', userSchema)
