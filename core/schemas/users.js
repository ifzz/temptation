import mongoose from 'mongoose'

const SchemaObjectId = mongoose.SchemaTypes.ObjectId

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
  settings: {
    authentications: [{
      platform: {
        type: SchemaObjectId,
        ref: 'platforms',
        required: true,
      },
      accessKey: {
        type: String,
        required: true,
      },
      secretKey: {
        type: String,
        required: true,
      },
    }],
  },
})
