const mongoose = require('mongoose')

const siteConfigSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    value: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
    description: {
      type: String,
      trim: true,
    },
    category: {
      type: String,
      enum: ['basic', 'seo', 'contact', 'social', 'branding', 'other'],
      default: 'basic',
    },
    isPublic: {
      type: Boolean,
      default: true,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
)

// 索引
siteConfigSchema.index({ category: 1, isPublic: 1 })

// 更新前钩子
siteConfigSchema.pre('save', function (next) {
  this.updatedAt = new Date()
  next()
})

module.exports = mongoose.model('SiteConfig', siteConfigSchema)
