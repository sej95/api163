import express from 'express'
import cors from 'cors'

let api
try {
  api = await import('./index.js')
} catch (error) {
  console.error('❌ API模块加载失败:', error)
  // 创建fallback API
  api = {
    default: {
      getBanner: () => Promise.resolve({ code: 200, banners: [] }),
      getSearchHot: () => Promise.resolve({ code: 200, data: [] }),
      search: () => Promise.resolve({ code: 200, result: { songs: [] } }),
      searchSuggest: () => Promise.resolve({ code: 200, result: {} }),
      getPersonalized: () => Promise.resolve({ code: 200, result: [] }),
      getNewSongs: () => Promise.resolve({ code: 200, result: { songs: [] } }),
      getHotSinger: () => Promise.resolve({ code: 200, artists: [] }),
      getSingerList: () => Promise.resolve({ code: 200, artists: [] }),
      getArtists: () => Promise.resolve({ code: 200, artist: {} }),
      getToplist: () => Promise.resolve({ code: 200, list: [] }),
      getCatList: () => Promise.resolve({ code: 200, sub: [] }),
      getPlayListDetail: () => Promise.resolve({ code: 200, playlist: {} }),
      getSongDetail: () => Promise.resolve({ code: 200, songs: [] }),
      getLyric: () => Promise.resolve({ code: 200, lrc: { lyric: '' } }),
      getSongUrl: () => Promise.resolve({ code: 200, data: [] }),
      getSongUrlV1: () => Promise.resolve({ code: 200, data: [] }),
      getMvAll: () => Promise.resolve({ code: 200, data: [] }),
      getMvDetail: () => Promise.resolve({ code: 200, data: {} }),
      getMvUrl: () => Promise.resolve({ code: 200, data: {} }),
      getMvDetailInfo: () => Promise.resolve({ code: 200, data: {} }),
      getMvRelated: () => Promise.resolve({ code: 200, mvs: [] }),
      getMvComments: () => Promise.resolve({ code: 200, comments: [] }),
      getAlbumData: () => Promise.resolve({ code: 200, album: {} }),
      getLoginStatus: () => Promise.resolve({ code: 200, data: { profile: null } })
    }
  }
}

const app = express()

// CORS配置 - 修复跨域问题
const allowedOrigins = [
  'https://i163.vercel.app',
  'https://163.iuai.ltd',
  'http://localhost:3000',
  'http://localhost:5173',
  'http://localhost:8080'
]

app.use(cors({
  origin: function (origin, callback) {
    // 允许没有origin的请求
    if (!origin) return callback(null, true)
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      console.log('被阻止的源:', origin)
      callback(new Error('不允许的源'), false)
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin']
}))

// 处理预检请求
app.options('*', cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// 统一的API处理函数
async function handleAPIRequest(res, apiCall, apiName, fallbackData = null) {
  try {
    console.log(`📡 调用API: ${apiName}`)
    const result = await apiCall
    
    if (result.code && result.code !== 200) {
      console.warn(`⚠️ API ${apiName} 返回错误:`, result.message)
      return res.status(400).json({ 
        code: 400, 
        message: `${apiName}失败: ${result.message || '未知错误'}`,
        data: result 
      })
    }
    
    res.json({ code: 200, data: result, message: 'success' })
  } catch (error) {
    console.error(`❌ API ${apiName} 调用失败:`, error.message)
    
    if (fallbackData) {
      // 返回fallback数据
      res.json({ code: 200, data: fallbackData, message: '使用示例数据' })
    } else {
      res.status(500).json({ 
        code: 500, 
        message: error.message
      })
    }
  }
}

// 根路由 - API文档
app.get('/', (req, res) => {
  res.json({
    message: '🎵 网易云音乐API服务',
    version: '2.0.0',
    timestamp: new Date().toISOString(),
    cors: '已配置跨域支持',
    endpoints: {
      // 基础功能
      '/health': 'GET - 健康检查',
      '/api/banner': 'GET - 轮播图',
      '/api/toplist/detail': 'GET - 排行榜详情',
      
      // 搜索相关
      '/api/search': 'GET - 搜索',
      '/api/search/default': 'GET - 默认搜索',
      '/api/search/hot': 'GET - 热搜列表',
      '/api/search/hot/detail': 'GET - 热搜详情',
      '/api/search/suggest': 'GET - 搜索建议',
      
      // 推荐内容
      '/api/personalized': 'GET - 推荐歌单',
      '/api/personalized/newsong': 'GET - 推荐新歌',
      
      // 歌手相关
      '/api/top/artists': 'GET - 热门歌手',
      '/api/artist/list': 'GET - 歌手列表',
      '/api/artists': 'GET - 歌手详情',
      
      // 歌单相关
      '/api/playlist/detail': 'GET - 歌单详情',
      '/api/playlist/catlist': 'GET - 歌单分类',
      
      // 歌曲相关
      '/api/song/detail': 'GET - 歌曲详情',
      '/api/song/url': 'GET - 歌曲地址',
      '/api/song/url/v1': 'GET - 歌曲地址V1',
      '/api/lyric': 'GET - 歌词',
      
      // MV相关
      '/api/mv/all': 'GET - 全部MV',
      '/api/mv/detail': 'GET - MV详情',
      '/api/mv/url': 'GET - MV地址',
      '/api/mv/detail/info': 'GET - MV数据',
      '/api/mv/related': 'GET - 相关MV',
      '/api/mv/comments': 'GET - MV评论',
      
      // 专辑相关
      '/api/album': 'GET - 专辑详情',
      
      // 用户相关
      '/api/login/status': 'GET - 登录状态'
    },
    example: {
      search: '/api/search?keywords=周杰伦&limit=10',
      playlist: '/api/playlist/detail?id=19723756',
      song: '/api/song/detail?ids=1359356908,1359356909',
      lyric: '/api/lyric?id=1359356908',
      mv: '/api/mv/detail?mvid=5436712'
    }
  })
})

// 健康检查
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'production',
    cors: 'enabled',
    message: '🎵 网易云音乐API服务正常运行'
  })
})

// ========== 基础功能API ==========
app.get('/api/banner', async (req, res) => {
  await handleAPIRequest(res, api.default.getBanner(req.query), '轮播图')
})

app.get('/api/toplist/detail', async (req, res) => {
  await handleAPIRequest(res, api.default.getToplist(), '排行榜详情')
})

// ========== 搜索相关API ==========
app.get('/api/search/default', async (req, res) => {
  // 返回默认搜索关键词
  res.json({
    code: 200,
    data: {
      showKeyword: '热门搜索',
      realkeyword: '周杰伦',
      searchWord: '周杰伦'
    },
    message: 'success'
  })
})

// 热搜详情 - 修复参数问题
app.get('/api/search/hot/detail', async (req, res) => {
  try {
    console.log('请求热搜详情，过滤参数...')
    // 不传递任何参数给网易云API
    const result = await api.default.getSearchHot()
    
    if (result.code === 200) {
      res.json({ code: 200, data: result.data, message: 'success' })
    } else {
      res.status(400).json({ 
        code: 400, 
        message: `获取热搜失败: ${result.message || '未知错误'}`,
        data: result 
      })
    }
  } catch (error) {
    console.error('热搜详情API错误:', error.message)
    // 返回示例数据
    res.json({
      code: 200,
      data: [
        { searchWord: '周杰伦', score: 1000000, content: '热门歌手', iconType: 1 },
        { searchWord: '林俊杰', score: 800000, content: '热门歌手', iconType: 1 },
        { searchWord: 'Taylor Swift', score: 700000, content: '国际歌手', iconType: 1 }
      ],
      message: '使用示例数据'
    })
  }
})

// 热搜列表 - 同样修复
app.get('/api/search/hot', async (req, res) => {
  try {
    console.log('请求热搜列表，过滤参数...')
    // 不传递任何参数给网易云API
    const result = await api.default.getSearchHot()
    
    if (result.code === 200) {
      res.json({ code: 200, data: result.data, message: 'success' })
    } else {
      res.status(400).json({ 
        code: 400, 
        message: `获取热搜失败: ${result.message || '未知错误'}`,
        data: result 
      })
    }
  } catch (error) {
    console.error('热搜列表API错误:', error.message)
    // 返回示例数据
    res.json({
      code: 200,
      data: [
        { searchWord: '周杰伦', score: 1000000, content: '热门歌手', iconType: 1 },
        { searchWord: '林俊杰', score: 800000, content: '热门歌手', iconType: 1 },
        { searchWord: 'Taylor Swift', score: 700000, content: '国际歌手', iconType: 1 }
      ],
      message: '使用示例数据'
    })
  }
})

app.get('/api/search', async (req, res) => {
  await handleAPIRequest(res, api.default.search(req.query), '搜索')
})

app.get('/api/search/suggest', async (req, res) => {
  const { keywords } = req.query
  if (!keywords) {
    return res.status(400).json({ code: 400, message: '关键词不能为空' })
  }
  await handleAPIRequest(res, api.default.searchSuggest(keywords), '搜索建议')
})

// ========== 推荐内容API ==========
app.get('/api/personalized', async (req, res) => {
  await handleAPIRequest(res, api.default.getPersonalized(req.query.limit), '推荐歌单')
})

app.get('/api/personalized/newsong', async (req, res) => {
  await handleAPIRequest(res, api.default.getNewSongs(), '推荐新歌')
})

// ========== 歌手相关API ==========
app.get('/api/top/artists', async (req, res) => {
  await handleAPIRequest(res, api.default.getHotSinger(), '热门歌手')
})

app.get('/api/artist/list', async (req, res) => {
  await handleAPIRequest(res, api.default.getSingerList(req.query), '歌手列表')
})

app.get('/api/artists', async (req, res) => {
  const { id } = req.query
  if (!id) {
    return res.status(400).json({ code: 400, message: '歌手ID不能为空' })
  }
  await handleAPIRequest(res, api.default.getArtists(id), '歌手详情')
})

// ========== 歌单相关API ==========
app.get('/api/playlist/detail', async (req, res) => {
  const { id } = req.query
  if (!id) {
    return res.status(400).json({ code: 400, message: '歌单ID不能为空' })
  }
  await handleAPIRequest(res, api.default.getPlayListDetail(req.query), '歌单详情')
})

app.get('/api/playlist/catlist', async (req, res) => {
  await handleAPIRequest(res, api.default.getCatList(), '歌单分类')
})

// ========== 歌曲相关API ==========
app.get('/api/song/detail', async (req, res) => {
  const { ids } = req.query
  if (!ids) {
    return res.status(400).json({ code: 400, message: '歌曲ID不能为空' })
  }
  await handleAPIRequest(res, api.default.getSongDetail(ids), '歌曲详情')
})

app.get('/api/song/url', async (req, res) => {
  const { id } = req.query
  if (!id) {
    return res.status(400).json({ code: 400, message: '歌曲ID不能为空' })
  }
  await handleAPIRequest(res, api.default.getSongUrl(id), '歌曲地址')
})

app.get('/api/song/url/v1', async (req, res) => {
  const { id, level = 'standard' } = req.query
  if (!id) {
    return res.status(400).json({ code: 400, message: '歌曲ID不能为空' })
  }
  
  try {
    // 尝试使用V1接口，如果失败则使用普通接口
    const result = await api.default.getSongUrlV1(id, level)
    res.json({ code: 200, data: result.data || [], message: 'success' })
  } catch (error) {
    // 降级到普通歌曲地址接口
    const result = await api.default.getSongUrl(id)
    res.json({ code: 200, data: result.data || [], message: 'success' })
  }
})

app.get('/api/lyric', async (req, res) => {
  const { id } = req.query
  if (!id) {
    return res.status(400).json({ code: 400, message: '歌曲ID不能为空' })
  }
  await handleAPIRequest(res, api.default.getLyric(id), '歌词', {
    lrc: { lyric: '[00:00.00] 暂无歌词' },
    tlyric: { lyric: '' }
  })
})

// ========== MV相关API ==========
app.get('/api/mv/all', async (req, res) => {
  await handleAPIRequest(res, api.default.getMvAll(req.query), '全部MV')
})

app.get('/api/mv/detail', async (req, res) => {
  const { mvid } = req.query
  if (!mvid) {
    return res.status(400).json({ code: 400, message: 'MV ID不能为空' })
  }
  await handleAPIRequest(res, api.default.getMvDetail(mvid), 'MV详情')
})

app.get('/api/mv/url', async (req, res) => {
  const { id } = req.query
  if (!id) {
    return res.status(400).json({ code: 400, message: 'MV ID不能为空' })
  }
  await handleAPIRequest(res, api.default.getMvUrl(id), 'MV地址')
})

app.get('/api/mv/detail/info', async (req, res) => {
  const { mvid } = req.query
  if (!mvid) {
    return res.status(400).json({ code: 400, message: 'MV ID不能为空' })
  }
  await handleAPIRequest(res, api.default.getMvDetailInfo(mvid), 'MV数据')
})

app.get('/api/mv/related', async (req, res) => {
  const { mvid } = req.query
  if (!mvid) {
    return res.status(400).json({ code: 400, message: 'MV ID不能为空' })
  }
  await handleAPIRequest(res, api.default.getMvRelated(mvid), '相关MV')
})

app.get('/api/mv/comments', async (req, res) => {
  await handleAPIRequest(res, api.default.getMvComments(req.query), 'MV评论')
})

// ========== 专辑相关API ==========
app.get('/api/album', async (req, res) => {
  const { id } = req.query
  if (!id) {
    return res.status(400).json({ code: 400, message: '专辑ID不能为空' })
  }
  await handleAPIRequest(res, api.default.getAlbumData(id), '专辑详情')
})

// ========== 用户相关API ==========
app.get('/api/login/status', async (req, res) => {
  try {
    const result = await api.default.getLoginStatus()
    res.json({ code: 200, data: result, message: 'success' })
  } catch (error) {
    // 返回未登录状态
    res.json({
      code: 200,
      data: {
        code: 200,
        profile: null
      },
      message: 'success'
    })
  }
})

// ========== 其他API ==========
app.get('/api/playlist/hot', async (req, res) => {
  await handleAPIRequest(res, api.default.getHotlist(), '热门歌单分类')
})

app.get('/api/top/playlist', async (req, res) => {
  await handleAPIRequest(res, api.default.getPlayList(req.query), '歌单列表')
})

app.get('/api/video/category/list', async (req, res) => {
  await handleAPIRequest(res, api.default.getVideoCategory(), '视频分类')
})

app.get('/api/video/group/list', async (req, res) => {
  await handleAPIRequest(res, api.default.getVideoTag(), '视频标签')
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

// 全局错误处理
app.use((err, req, res, next) => {
  console.error('❌ 服务器错误:', err)
  res.status(500).json({
    code: 500,
    message: '服务器内部错误',
    error: process.env.NODE_ENV === 'production' ? {} : err.message
  })
})

export default app