const mongoose = require('mongoose')

const articleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, '标题不能为空'],
      trim: true,
      maxlength: [200, '标题不能超过 200 个字符'],
    },
    summary: {
      type: String,
      trim: true,
      maxlength: [500, '摘要不能超过 500 个字符'],
    },
    content: {
      type: String,
      required: [true, '内容不能为空'],
    },
    coverImage: {
      type: String,
      default: '',
    },
    images: [
      {
        type: String,
      },
    ],
    category: {
      type: String,
      enum: ['公司新闻', '业务动态', '荣誉资质', '行业资讯', '政策法规'],
      default: '公司新闻',
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
    author: {
      type: String,
      default: '管理员',
    },
    status: {
      type: String,
      enum: ['draft', 'published', 'archived'],
      default: 'draft',
    },
    viewCount: {
      type: Number,
      default: 0,
    },
    isTop: {
      type: Boolean,
      default: false,
    },
    publishedAt: {
      type: Date,
    },
    createdAt: {
      type: Date,
      default: Date.now,
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
articleSchema.index({ category: 1, status: 1, publishedAt: -1 })
articleSchema.index({ tags: 1 })
articleSchema.index({ title: 'text', content: 'text' })

// 更新前钩子
articleSchema.pre('save', function (next) {
  this.updatedAt = new Date()
  if (this.status === 'published' && !this.publishedAt) {
    this.publishedAt = new Date()
  }
  next()
})

module.exports = mongoose.model('Article', articleSchema)
