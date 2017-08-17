import mongoose from 'mongoose'

export default mongoose.Schema({
  sessionId: {
    type: String,
    required: true,
  },
  creator: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  resolvedContent: {
    type: String,
    required: true,
  },
  createdate: {
    type: Date,
    'default': Date.now(),
  },
})
