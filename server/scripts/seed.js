require('dotenv').config()
const mongoose = require('mongoose')
const User = require('../models/User')
const SiteConfig = require('../models/SiteConfig')
const Article = require('../models/Article')
const connectDB = require('../config/db')

const seedData = async () => {
  try {
    await connectDB()

    console.log('开始初始化数据...')

    const adminExists = await User.findOne({ role: 'admin' })
    if (!adminExists) {
      await User.create({
        username: 'admin',
        email: 'admin@example.com',
        password: 'admin123456',
        role: 'admin',
      })
      console.log('✓ 创建管理员账户：admin@example.com / admin123456')
    } else {
      console.log('✓ 管理员账户已存在')
    }

    const editorExists = await User.findOne({ role: 'editor' })
    if (!editorExists) {
      await User.create({
        username: 'editor',
        email: 'editor@example.com',
        password: 'editor123456',
        role: 'editor',
      })
      console.log('✓ 创建编辑账户：editor@example.com / editor123456')
    } else {
      console.log('✓ 编辑账户已存在')
    }

    const configCount = await SiteConfig.countDocuments()
    if (configCount === 0) {
      const configs = [
        { key: 'siteName', value: '集团公司', category: 'basic', description: '网站名称' },
        {
          key: 'siteDescription',
          value: '专业的边缘算力、支付金融、电商服务提供商',
          category: 'basic',
          description: '网站描述',
        },
        {
          key: 'siteKeywords',
          value: '边缘计算，CDN,支付，金融，电商',
          category: 'seo',
          description: '网站关键词',
        },
        {
          key: 'contactEmail',
          value: 'contact@example.com',
          category: 'contact',
          description: '联系邮箱',
        },
        {
          key: 'contactPhone',
          value: '400-xxx-xxxx',
          category: 'contact',
          description: '联系电话',
        },
        {
          key: 'contactAddress',
          value: '福建省福州市',
          category: 'contact',
          description: '联系地址',
        },
        {
          key: 'wechatQrcode',
          value: '/uploads/wechat.jpg',
          category: 'social',
          description: '微信二维码',
        },
        { key: 'weiboUrl', value: '', category: 'social', description: '微博链接' },
        { key: 'logo', value: '/uploads/logo.png', category: 'branding', description: '网站 Logo' },
        {
          key: 'favicon',
          value: '/uploads/favicon.ico',
          category: 'branding',
          description: '网站图标',
        },
      ]
      await SiteConfig.insertMany(configs)
      console.log('✓ 创建初始站点配置')
    } else {
      console.log('✓ 站点配置已存在')
    }

    const articleCount = await Article.countDocuments()
    if (articleCount === 0) {
      const articles = [
        {
          title: '欢迎来到集团公司官方网站',
          summary: '我们专注于边缘计算、支付金融和电商服务领域',
          content:
            '集团公司致力于为客户提供优质的边缘计算、支付金融和电商服务。我们拥有强大的技术团队和完善的服务体系，为您的业务发展提供强力支持。',
          category: '公司新闻',
          tags: ['公司新闻', '集团动态'],
          status: 'published',
          isTop: true,
          publishedAt: new Date(),
        },
        {
          title: '边缘计算节点突破 100 个',
          summary: '我们的 CDN 网络覆盖全国主要城市',
          content:
            '随着业务的不断发展，我们的边缘计算节点已经突破 100 个，覆盖全国所有主要城市，为用户提供低延迟、高可用的边缘计算服务。',
          category: '业务动态',
          tags: ['边缘计算', 'CDN', '基础设施'],
          status: 'published',
          isTop: true,
        },
        {
          title: '获得支付业务许可证',
          summary: '正式获批开展第三方支付业务',
          content:
            '我们已成功获得中国人民银行颁发的支付业务许可证，正式获批开展第三方支付业务，为客户提供更安全、更便捷的支付服务。',
          category: '荣誉资质',
          tags: ['支付', '资质', '许可证'],
          status: 'published',
        },
      ]
      await Article.insertMany(articles)
      console.log('✓ 创建示例文章')
    } else {
      console.log('✓ 文章已存在')
    }

    console.log('\n数据初始化完成!')
    console.log('\n管理员账户：admin@example.com / admin123456')
    console.log('编辑账户：editor@example.com / editor123456')
    console.log('\n服务器启动命令：npm run server')

    process.exit(0)
  } catch (error) {
    console.error('初始化失败:', error)
    process.exit(1)
  }
}

seedData()
