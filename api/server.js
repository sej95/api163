import express from 'express'
import cors from 'cors'
import api from './index.js'

const app = express()
const PORT = process.env.PORT || 3000

// 中间件
app.use(cors())
app.use(express.json())

// 根路由 - API文档
app.get('/', (req, res) => {
  res.json({
    message: '🎵 网易云音乐API服务 - 部署在Vercel',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    endpoints: {
      '/api/banner': '获取轮播图',
      '/api/search/hot': '获取热搜列表',
      '/api/search': '搜索',
      '/api/search/suggest': '搜索建议',
      '/api/personalized': '获取推荐歌单',
      '/api/personalized/newsong': '获取推荐新歌',
      '/api/top/artists': '获取热门歌手',
      '/api/artist/list': '获取歌手分类列表',
      '/api/artists': '获取歌手详情',
      '/api/playlist/detail': '获取歌单详情',
      '/api/song/detail': '获取歌曲详情',
      '/api/lyric': '获取歌词',
      '/api/toplist': '获取排行榜',
      '/api/mv/detail': '获取MV详情',
      '/api/mv/url': '获取MV地址',
      '/api/album': '获取专辑详情'
    },
    example: {
      search: '/api/search?keywords=周杰伦&limit=10',
      playlist: '/api/playlist/detail?id=123456789',
      song: '/api/song/detail?ids=123456,789012'
    }
  })
})

// API路由
app.get('/api/banner', async (req, res) => {
  try {
    const result = await api.getBanner(req.query)
    res.json({ code: 200, data: result, message: 'success' })
  } catch (error) {
    res.status(500).json({ code: 500, message: error.message })
  }
})

app.get('/api/search/hot', async (req, res) => {
  try {
    const result = await api.getSearchHot()
    res.json({ code: 200, data: result, message: 'success' })
  } catch (error) {
    res.status(500).json({ code: 500, message: error.message })
  }
})

app.get('/api/search', async (req, res) => {
  try {
    const result = await api.search(req.query)
    res.json({ code: 200, data: result, message: 'success' })
  } catch (error) {
    res.status(500).json({ code: 500, message: error.message })
  }
})

app.get('/api/search/suggest', async (req, res) => {
  try {
    const { keywords } = req.query
    if (!keywords) {
      return res.status(400).json({ code: 400, message: '关键词不能为空' })
    }
    const result = await api.searchSuggest(keywords)
    res.json({ code: 200, data: result, message: 'success' })
  } catch (error) {
    res.status(500).json({ code: 500, message: error.message })
  }
})

app.get('/api/personalized', async (req, res) => {
  try {
    const result = await api.getPersonalized(req.query)
    res.json({ code: 200, data: result, message: 'success' })
  } catch (error) {
    res.status(500).json({ code: 500, message: error.message })
  }
})

app.get('/api/personalized/newsong', async (req, res) => {
  try {
    const result = await api.getNewSongs()
    res.json({ code: 200, data: result, message: 'success' })
  } catch (error) {
    res.status(500).json({ code: 500, message: error.message })
  }
})

app.get('/api/top/artists', async (req, res) => {
  try {
    const result = await api.getHotSinger()
    res.json({ code: 200, data: result, message: 'success' })
  } catch (error) {
    res.status(500).json({ code: 500, message: error.message })
  }
})

app.get('/api/artist/list', async (req, res) => {
  try {
    const result = await api.getSingerList(req.query)
    res.json({ code: 200, data: result, message: 'success' })
  } catch (error) {
    res.status(500).json({ code: 500, message: error.message })
  }
})

app.get('/api/artists', async (req, res) => {
  try {
    const { id } = req.query
    if (!id) {
      return res.status(400).json({ code: 400, message: '歌手ID不能为空' })
    }
    const result = await api.getArtists(id)
    res.json({ code: 200, data: result, message: 'success' })
  } catch (error) {
    res.status(500).json({ code: 500, message: error.message })
  }
})

app.get('/api/playlist/detail', async (req, res) => {
  try {
    const { id } = req.query
    if (!id) {
      return res.status(400).json({ code: 400, message: '歌单ID不能为空' })
    }
    const result = await api.getPlayListDetail(req.query)
    res.json({ code: 200, data: result, message: 'success' })
  } catch (error) {
    res.status(500).json({ code: 500, message: error.message })
  }
})

app.get('/api/song/detail', async (req, res) => {
  try {
    const { ids } = req.query
    if (!ids) {
      return res.status(400).json({ code: 400, message: '歌曲ID不能为空' })
    }
    const result = await api.getSongDetail(ids)
    res.json({ code: 200, data: result, message: 'success' })
  } catch (error) {
    res.status(500).json({ code: 500, message: error.message })
  }
})

app.get('/api/lyric', async (req, res) => {
  try {
    const { id } = req.query
    if (!id) {
      return res.status(400).json({ code: 400, message: '歌曲ID不能为空' })
    }
    const result = await api.getLyric(id)
    res.json({ code: 200, data: result, message: 'success' })
  } catch (error) {
    res.status(500).json({ code: 500, message: error.message })
  }
})

app.get('/api/toplist', async (req, res) => {
  try {
    const result = await api.getToplist()
    res.json({ code: 200, data: result, message: 'success' })
  } catch (error) {
    res.status(500).json({ code: 500, message: error.message })
  }
})

app.get('/api/mv/detail', async (req, res) => {
  try {
    const { mvid } = req.query
    if (!mvid) {
      return res.status(400).json({ code: 400, message: 'MV ID不能为空' })
    }
    const result = await api.getMvDetail(mvid)
    res.json({ code: 200, data: result, message: 'success' })
  } catch (error) {
    res.status(500).json({ code: 500, message: error.message })
  }
})

app.get('/api/mv/url', async (req, res) => {
  try {
    const { id } = req.query
    if (!id) {
      return res.status(400).json({ code: 400, message: 'MV ID不能为空' })
    }
    const result = await api.getMvUrl(id)
    res.json({ code: 200, data: result, message: 'success' })
  } catch (error) {
    res.status(500).json({ code: 500, message: error.message })
  }
})

app.get('/api/album', async (req, res) => {
  try {
    const { id } = req.query
    if (!id) {
      return res.status(400).json({ code: 400, message: '专辑ID不能为空' })
    }
    const result = await api.getAlbumData(id)
    res.json({ code: 200, data: result, message: 'success' })
  } catch (error) {
    res.status(500).json({ code: 500, message: error.message })
  }
})

// 健康检查
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  })
})

// 404处理
app.use('*', (req, res) => {
  res.status(404).json({
    code: 404,
    message: '接口不存在',
    path: req.originalUrl
  })
})

// 错误处理中间件
app.use((err, req, res, next) => {
  console.error('服务器错误:', err)
  res.status(500).json({
    code: 500,
    message: '服务器内部错误',
    error: process.env.NODE_ENV === 'production' ? {} : err.message
  })
})

// 启动服务器
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`🚀 网易云音乐API服务运行在: http://localhost:${PORT}`)
    console.log(`📚 API文档: http://localhost:${PORT}`)
  })
}

export default app