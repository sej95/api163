import express from 'express'
import cors from 'cors'
import api from './index.js'

const app = express()

// 中间件
app.use(cors())
app.use(express.json())

// 统一的API处理函数
async function handleAPIRequest(res, apiCall, apiName) {
  try {
    const result = await apiCall
    
    // 检查网易云API返回的状态码
    if (result.code && result.code !== 200) {
      return res.status(400).json({ 
        code: 400, 
        message: `API错误: ${result.message || '未知错误'}`,
        data: result 
      })
    }
    
    res.json({ code: 200, data: result, message: 'success' })
  } catch (error) {
    console.error(`API ${apiName} 调用失败:`, error.message)
    res.status(500).json({ 
      code: 500, 
      message: error.message
    })
  }
}

// 根路由 - API文档
app.get('/', (req, res) => {
  res.json({
    message: '🎵 网易云音乐API服务 - 部署在Vercel',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    endpoints: {
      '/api/banner': 'GET - 获取轮播图',
      '/api/search/hot': 'GET - 获取热搜列表',
      '/api/search': 'GET - 搜索',
      '/api/search/suggest': 'GET - 搜索建议',
      '/api/personalized': 'GET - 获取推荐歌单',
      '/api/personalized/newsong': 'GET - 获取推荐新歌',
      '/api/top/artists': 'GET - 获取热门歌手',
      '/api/artist/list': 'GET - 获取歌手分类列表',
      '/api/artists': 'GET - 获取歌手详情',
      '/api/playlist/detail': 'GET - 获取歌单详情',
      '/api/song/detail': 'GET - 获取歌曲详情',
      '/api/lyric': 'GET - 获取歌词',
      '/api/toplist': 'GET - 获取排行榜',
      '/api/mv/detail': 'GET - 获取MV详情',
      '/api/mv/url': 'GET - 获取MV地址',
      '/api/album': 'GET - 获取专辑详情',
      '/api/playlist/catlist': 'GET - 获取歌单分类'
    },
    example: {
      search: '/api/search?keywords=周杰伦&limit=10',
      playlist: '/api/playlist/detail?id=123456789',
      song: '/api/song/detail?ids=123456,789012',
      banner: '/api/banner?type=2'
    }
  })
})

// API路由
app.get('/api/banner', async (req, res) => {
  await handleAPIRequest(res, api.getBanner(req.query), '轮播图')
})

app.get('/api/search/hot', async (req, res) => {
  await handleAPIRequest(res, api.getSearchHot(), '热搜列表')
})

app.get('/api/search', async (req, res) => {
  await handleAPIRequest(res, api.search(req.query), '搜索')
})

app.get('/api/search/suggest', async (req, res) => {
  const { keywords } = req.query
  if (!keywords) {
    return res.status(400).json({ code: 400, message: '关键词不能为空' })
  }
  await handleAPIRequest(res, api.searchSuggest(keywords), '搜索建议')
})

app.get('/api/personalized', async (req, res) => {
  await handleAPIRequest(res, api.getPersonalized(req.query.limit), '推荐歌单')
})

app.get('/api/personalized/newsong', async (req, res) => {
  await handleAPIRequest(res, api.getNewSongs(), '推荐新歌')
})

app.get('/api/top/artists', async (req, res) => {
  await handleAPIRequest(res, api.getHotSinger(), '热门歌手')
})

app.get('/api/artist/list', async (req, res) => {
  await handleAPIRequest(res, api.getSingerList(req.query), '歌手列表')
})

app.get('/api/artists', async (req, res) => {
  const { id } = req.query
  if (!id) {
    return res.status(400).json({ code: 400, message: '歌手ID不能为空' })
  }
  await handleAPIRequest(res, api.getArtists(id), '歌手详情')
})

app.get('/api/playlist/detail', async (req, res) => {
  const { id } = req.query
  if (!id) {
    return res.status(400).json({ code: 400, message: '歌单ID不能为空' })
  }
  await handleAPIRequest(res, api.getPlayListDetail(req.query), '歌单详情')
})

app.get('/api/song/detail', async (req, res) => {
  const { ids } = req.query
  if (!ids) {
    return res.status(400).json({ code: 400, message: '歌曲ID不能为空' })
  }
  await handleAPIRequest(res, api.getSongDetail(ids), '歌曲详情')
})

// 歌曲地址路由
app.get('/song/url', async (req, res) => {
  const { id } = req.query
  if (!id) {
    return res.status(400).json({ code: 400, message: '歌曲ID不能为空' })
  }
  
  try {
    const result = await api.getSongUrl(id)
    
    if (result.code && result.code !== 200) {
      return res.status(400).json({ 
        code: 400, 
        message: `获取歌曲地址失败: ${result.message || '未知错误'}`,
        data: result 
      })
    }
    
    res.json({ code: 200, data: result, message: 'success' })
  } catch (error) {
    console.error('歌曲地址API错误:', error.message)
    res.status(500).json({ 
      code: 500, 
      message: error.message
    })
  }
})

// 歌词路由（已存在，确保正确）
app.get('/api/lyric', async (req, res) => {
  const { id } = req.query
  if (!id) {
    return res.status(400).json({ code: 400, message: '歌曲ID不能为空' })
  }
  
  try {
    const result = await api.getLyric(id)
    
    if (result.code && result.code !== 200) {
      return res.status(400).json({ 
        code: 400, 
        message: `获取歌词失败: ${result.message || '未知错误'}`,
        data: result 
      })
    }
    
    res.json({ code: 200, data: result, message: 'success' })
  } catch (error) {
    console.error('歌词API错误:', error.message)
    res.status(500).json({ 
      code: 500, 
      message: error.message
    })
  }
})

app.get('/api/toplist', async (req, res) => {
  await handleAPIRequest(res, api.getToplist(), '排行榜')
})

app.get('/api/mv/detail', async (req, res) => {
  const { mvid } = req.query
  if (!mvid) {
    return res.status(400).json({ code: 400, message: 'MV ID不能为空' })
  }
  await handleAPIRequest(res, api.getMvDetail(mvid), 'MV详情')
})

app.get('/api/mv/url', async (req, res) => {
  const { id } = req.query
  if (!id) {
    return res.status(400).json({ code: 400, message: 'MV ID不能为空' })
  }
  await handleAPIRequest(res, api.getMvUrl(id), 'MV地址')
})

app.get('/api/album', async (req, res) => {
  const { id } = req.query
  if (!id) {
    return res.status(400).json({ code: 400, message: '专辑ID不能为空' })
  }
  await handleAPIRequest(res, api.getAlbumData(id), '专辑详情')
})

app.get('/api/playlist/catlist', async (req, res) => {
  await handleAPIRequest(res, api.getCatList(), '歌单分类')
})

app.get('/api/video/category/list', async (req, res) => {
  await handleAPIRequest(res, api.getVideoCategory(), '视频分类')
})

// 健康检查
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'production',
    platform: 'Vercel'
  })
})

// 404处理
app.use('*', (req, res) => {
  res.status(404).json({
    code: 404,
    message: '接口不存在',
    path: req.originalUrl,
    suggest: '访问 / 查看所有可用接口'
  })
})

// 错误处理中间件
app.use((err, req, res, next) => {
  console.error('服务器错误:', err)
  res.status(500).json({
    code: 500,
    message: '服务器内部错误'
  })
})

// Vercel需要导出app
export default app