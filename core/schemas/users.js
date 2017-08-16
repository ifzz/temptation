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
  nickname: {
    type: String,
  },
  avatar: {
    type: String,
    'default': '/images/avatar_default.jpg',
  },
  age: {
    type: Number,
    min: 1,
    max: 120,
  },
  city: {
    type: String,
  },
  hometown: {
    type: String,
  },
  phone: {
    type: String,
  },
  email: {
    type: String,
  },
  birthday: {
    type: Date,
  },
  address: {
    type: String,
  },
  createdate: {
    type: Date,
    default: Date.now(),
  },
})
