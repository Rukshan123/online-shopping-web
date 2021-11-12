import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false, required: true },
  },
  {
    // while mongoose create user in the database , you will have a time stamp for creating a record and last update a record
    timestamps: true,
  }
)

const User = mongoose.model('user', userSchema)
export default User
