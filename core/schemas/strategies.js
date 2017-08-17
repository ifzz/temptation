import mongoose from 'mongoose'

const SchemaObjectId = mongoose.SchemaTypes.ObjectId

export default mongoose.Schema({
  // 策略创建者
  creator: {
    type: SchemaObjectId,
    ref: 'users',
    required: true,
  },
  // 策略使用者
  adopters: {
    type: SchemaObjectId,
    ref: 'users',
    required: true,
  },
  // 策略类型
  category: {
    type: Number,
    required: true,
  },
})
