const SiteConfig = require('../models/SiteConfig')

const getConfigs = async (req, res) => {
  try {
    const { category } = req.query
    const query = category ? { category } : {}
    const configs = await SiteConfig.find(query).sort({ category: 1, key: 1 })
    res.json(configs)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const getConfigByKey = async (req, res) => {
  try {
    const config = await SiteConfig.findOne({ key: req.params.key })
    if (config) {
      res.json(config)
    } else {
      res.status(404).json({ message: '配置项不存在' })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const createConfig = async (req, res) => {
  try {
    const { key, value, category, description } = req.body

    const configExists = await SiteConfig.findOne({ key })
    if (configExists) {
      return res.status(400).json({ message: '配置键已存在' })
    }

    const config = await SiteConfig.create({
      key,
      value,
      category: category || 'basic',
      description: description || '',
    })

    res.status(201).json(config)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const updateConfig = async (req, res) => {
  try {
    const { value, description } = req.body
    const config = await SiteConfig.findOne({ key: req.params.key })

    if (config) {
      config.value = value !== undefined ? value : config.value
      config.description = description !== undefined ? description : config.description
      const updatedConfig = await config.save()
      res.json(updatedConfig)
    } else {
      res.status(404).json({ message: '配置项不存在' })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const deleteConfig = async (req, res) => {
  try {
    const config = await SiteConfig.findOneAndDelete({ key: req.params.key })
    if (config) {
      res.json({ message: '配置已删除' })
    } else {
      res.status(404).json({ message: '配置项不存在' })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const batchGetConfigs = async (req, res) => {
  try {
    const { keys } = req.body
    if (!Array.isArray(keys)) {
      return res.status(400).json({ message: 'keys 必须是数组' })
    }

    const configs = await SiteConfig.find({ key: { $in: keys } })
    const result = {}
    configs.forEach(config => {
      result[config.key] = config.value
    })

    res.json(result)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = {
  getConfigs,
  getConfigByKey,
  createConfig,
  updateConfig,
  deleteConfig,
  batchGetConfigs,
}
