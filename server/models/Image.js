const mongoose = require('mongoose')

const imageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    originalName: {
      type: String,
      required: true,
    },
    path: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    size: {
      type: Number,
      required: true,
    },
    mimeType: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ['article', 'logo', 'banner', 'product', 'other'],
      default: 'other',
    },
    description: {
      type: String,
      trim: true,
    },
    alt: {
      type: String,
      trim: true,
    },
    width: {
      type: Number,
    },
    height: {
      type: Number,
    },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
)

// 索引
imageSchema.index({ category: 1, createdAt: -1 })
imageSchema.index({ name: 1 })

module.exports = mongoose.model('Image', imageSchema)
