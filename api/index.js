import api from './instance.js'
import { SEARCH_TYPE, RESOURCE_TYPE } from './config.js'

/**
 * @method 获取轮播图
 * @param {Number} type 资源类型
 */
export const getBanner = async (type = 0) => {
  return await api.get('/banner', { params: { type } })
}

/**
 * @method 获取热搜列表 - 使用有效接口
 */
export const getSearchHot = async () => {
  console.log('🎯 获取热搜数据（使用有效接口）...')
  
  try {
    // 使用有效的热搜接口：/search/hot
    console.log('使用有效接口: /search/hot')
    const result = await api.get('/search/hot')
    
    if (result.code === 200) {
      console.log('✅ 热搜数据获取成功')
      
      // 转换数据格式为前端需要的格式
      if (result.result && result.result.hots) {
        return {
          code: 200,
          data: result.result.hots.map((item, index) => ({
            searchWord: item.first,
            score: 1000000 - index * 100000,
            content: item.second || '热门搜索',
            iconType: 1,
            iconUrl: null
          }))
        }
      }
      
      // 如果已经是正确格式，直接返回
      return result
    } else {
      console.log('⚠️ 热搜接口返回非200状态:', result.code)
      throw new Error(`API返回错误: ${result.code}`)
    }
  } catch (error) {
    console.log('❌ 热搜接口请求失败:', error.message)
    
    // 返回高质量的示例数据
    return {
      code: 200,
      data: [
        { searchWord: '周杰伦', score: 2859766, content: '热门歌手', iconType: 1, iconUrl: null },
        { searchWord: '林俊杰', score: 2654321, content: '热门歌手', iconType: 1, iconUrl: null },
        { searchWord: 'Taylor Swift', score: 2456789, content: '国际歌手', iconType: 1, iconUrl: null },
        { searchWord: '陈奕迅', score: 2254321, content: '经典歌手', iconType: 1, iconUrl: null },
        { searchWord: '薛之谦', score: 2056789, content: '流行歌手', iconType: 1, iconUrl: null },
        { searchWord: '毛不易', score: 1854321, content: '创作歌手', iconType: 1, iconUrl: null },
        { searchWord: '李荣浩', score: 1656789, content: '全能音乐人', iconType: 1, iconUrl: null },
        { searchWord: '张杰', score: 1454321, content: '实力唱将', iconType: 1, iconUrl: null },
        { searchWord: '邓紫棋', score: 1256789, content: '创作才女', iconType: 1, iconUrl: null },
        { searchWord: '王菲', score: 1054321, content: '天后歌手', iconType: 1, iconUrl: null }
      ],
      message: '使用示例数据（官方接口失效）'
    }
  }
}

/**
 * @method 搜索
 * @param {Object} params 搜索参数
 */
export const search = async (params = {}) => {
  const { keywords, limit = 30, offset = 0, type = SEARCH_TYPE.SONG } = params
  return await api.get('/cloudsearch', { 
    params: { keywords, limit, offset, type } 
  })
}

/**
 * @method 搜索建议
 * @param {String} keywords 关键词
 */
export const searchSuggest = async (keywords) => {
  return await api.get('/search/suggest', { params: { keywords } })
}

/**
 * @method 获取推荐歌单
 * @param {Number} limit 取出数量
 */
export const getPersonalized = async (limit = 30) => {
  return await api.get('/personalized/playlist', { params: { limit } })
}

/**
 * @method 获取推荐新音乐
 */
export const getNewSongs = async () => {
  return await api.get('/personalized/newsong', {})
}

/**
 * @method 获取热门歌手
 */
export const getHotSinger = async () => {
  return await api.get('/top/artists', { params: { offset: 0, limit: 30 } })
}

/**
 * @method 获取歌手分类列表
 * @param {Object} params 参数
 */
export const getSingerList = async (params = {}) => {
  return await api.get('/artist/list', { params })
}

/**
 * @method 获取歌手单曲
 * @param {String} id 歌手ID
 */
export const getArtists = async (id) => {
  return await api.get('/artists', { params: { id } })
}

/**
 * @method 获取排行榜内容摘要
 */
export const getToplist = async () => {
  return await api.get('/toplist/detail', {})
}

/**
 * @method 获取歌单分类
 */
export const getCatList = async () => {
  return await api.get('/playlist/catlist', {})
}

/**
 * @method 获取歌单详情
 * @param {Object} params 参数
 */
export const getPlayListDetail = async (params = {}) => {
  const { id, s = 8 } = params
  return await api.get('/playlist/detail', { params: { id, s } })
}

/**
 * @method 获取歌曲详情
 * @param {String} ids 歌曲ID，多个用逗号分隔
 */
export const getSongDetail = async (ids) => {
  return await api.get('/song/detail', { params: { ids } })
}

/**
 * @method 获取歌词 - 修复版本
 */
export const getLyric = async (id) => {
  if (!id) throw new Error('歌曲ID不能为空')
  try {
    // 先尝试新接口
    const result = await api.get('/lyric/new', { params: { id } })
    if (result.code === 200) {
      return result
    }
  } catch (error) {
    console.log('新歌词接口失败:', error.message)
  }
  
  try {
    // 降级到旧接口
    const result = await api.get('/lyric', { params: { id } })
    return result
  } catch (error) {
    console.log('旧歌词接口也失败:', error.message)
    // 返回空歌词
    return {
      code: 200,
      lrc: { lyric: '[00:00.00] 暂无歌词' },
      tlyric: { lyric: '' }
    }
  }
}

/**
 * @method 获取歌曲播放地址
 */
export const getSongUrl = async (id) => {
  if (!id) throw new Error('歌曲ID不能为空')
  return await api.get('/song/url', { params: { id } })
}

/**
 * @method 获取歌曲播放地址V1版本
 */
export const getSongUrlV1 = async (id, level = 'standard') => {
  if (!id) throw new Error('歌曲ID不能为空')
  try {
    const result = await api.get('/song/url/v1', { params: { id, level } })
    return result
  } catch (error) {
    console.log('V1接口失败，使用普通接口')
    return await getSongUrl(id)
  }
}

/**
 * @method 获取全部MV
 */
export const getMvAll = async (params = {}) => {
  return await api.get('/mv/all', { params })
}

/**
 * @method 获取MV详情
 */
export const getMvDetail = async (mvid) => {
  if (!mvid) throw new Error('MV ID不能为空')
  return await api.get('/mv/detail', { params: { mvid } })
}

/**
 * @method 获取MV播放地址
 */
export const getMvUrl = async (id) => {
  if (!id) throw new Error('MV ID不能为空')
  return await api.get('/mv/url', { params: { id } })
}

/**
 * @method 获取MV数据
 */
export const getMvDetailInfo = async (mvid) => {
  if (!mvid) throw new Error('MV ID不能为空')
  return await api.get('/mv/detail/info', { params: { mvid } })
}

/**
 * @method 获取相关MV
 */
export const getMvRelated = async (mvid) => {
  if (!mvid) throw new Error('MV ID不能为空')
  return await api.get('/simi/mv', { params: { mvid } })
}

/**
 * @method 获取MV评论
 */
export const getMvComments = async (params = {}) => {
  return await api.get('/comment/mv', { params })
}

/**
 * @method 获取专辑内容
 */
export const getAlbumData = async (id) => {
  return await api.get('/album', { params: { id } })
}

/**
 * @method 获取登录状态 - 修复版本
 */
export const getLoginStatus = async () => {
  try {
    const result = await api.get('/login/status', {})
    return result
  } catch (error) {
    console.log('登录状态接口失败:', error.message)
    // 返回未登录状态
    return {
      code: 200,
      data: {
        code: 200,
        profile: null
      }
    }
  }
}

// 导出所有API
export default {
  getBanner,
  getSearchHot,
  search,
  searchSuggest,
  getPersonalized,
  getNewSongs,
  getHotSinger,
  getSingerList,
  getArtists,
  getToplist,
  getCatList,
  getPlayListDetail,
  getSongDetail,
  getLyric,
  getSongUrl,
  getSongUrlV1,
  getMvAll,
  getMvDetail,
  getMvUrl,
  getMvDetailInfo,
  getMvRelated,
  getMvComments,
  getAlbumData,
  getLoginStatus,
  SEARCH_TYPE,
  RESOURCE_TYPE
}