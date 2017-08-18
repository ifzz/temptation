import mongoose from 'mongoose'

export default mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  salt: {
    type: String,
    required: true,
  },
  hash: {
    type: String,
    required: true,
  },
  createdate: {
    type: Date,
    default: Date.now(),
  },
  profiles: {
    nickname: String,
    phone: String,
    email: String,
    avatar: {
      type: String,
      default: '/images/avatar_default.jpg',
    },
    age: {
      type: Number,
      min: 1,
      max: 120,
      default: 20,
    },
  },
  // settings: {},
})
