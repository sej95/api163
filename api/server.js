import express from 'express'
import cors from 'cors'

let api
try {
  // 动态导入，避免重复声明问题
  api = await import('./index.js')
} catch (error) {
  console.error('❌ API模块加载失败:', error)
  // 创建fallback
  api = {
    default: {
      getToplist: () => Promise.resolve({ code: 200, list: [] }),
      getBanner: () => Promise.resolve({ code: 200, banners: [] }),
      search: () => Promise.resolve({ code: 200, result: { songs: [] } }),
      getMvAll: () => Promise.resolve({ code: 200, data: [] })
    }
  }
}

const app = express()

app.use(cors())
app.use(express.json())

// 健康检查
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    message: 'API服务正常运行'
  })
})

// 排行榜详情
app.get('/api/toplist/detail', async (req, res) => {
  try {
    const result = await api.default.getToplist()
    res.json({ code: 200, data: result, message: 'success' })
  } catch (error) {
    console.error('排行榜错误:', error)
    res.status(500).json({ code: 500, message: error.message })
  }
})

// 搜索
app.get('/api/search', async (req, res) => {
  try {
    const result = await api.default.search(req.query)
    res.json({ code: 200, data: result, message: 'success' })
  } catch (error) {
    res.status(500).json({ code: 500, message: error.message })
  }
})

// MV全部
app.get('/api/mv/all', async (req, res) => {
  try {
    const result = await api.default.getMvAll(req.query)
    res.json({ code: 200, data: result, message: 'success' })
  } catch (error) {
    res.status(500).json({ code: 500, message: error.message })
  }
})

// 其他路由...

// 404处理
app.use('*', (req, res) => {
  res.status(404).json({ code: 404, message: '接口不存在' })
})

export default app