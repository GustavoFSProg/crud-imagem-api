import { model, Schema } from 'mongoose'

const schema = new Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
  },
  image: {
    type: String,
  },
})

export default model('productModelLast', schema)
