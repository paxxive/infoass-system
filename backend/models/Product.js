import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    enum: ['physical', 'digital'],
    required: true
  },
  platform: {
    type: String,
    enum: ['playstation', 'xbox', 'nintendo', 'pc', 'mobile', 'cross-platform'],
    required: true
  },
  imageUrl: {
    type: String,
    default: ''
  },
  stock: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Product', productSchema);