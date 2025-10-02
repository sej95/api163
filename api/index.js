import api from './instance.js'
import { SEARCH_TYPE, RESOURCE_TYPE } from './config.js'

// 轮播图
export const getBanner = async (type = 0) => {
  return await api.get('/banner', { params: { type } })
}

// 热搜列表
export const getSearchHot = async () => {
  return await api.get('/search/hot/detail', {})
}

// 搜索
export const search = async (params = {}) => {
  const { keywords, limit = 30, offset = 0, type = SEARCH_TYPE.SONG } = params
  return await api.get('/cloudsearch', { 
    params: { keywords, limit, offset, type } 
  })
}

// 搜索建议
export const searchSuggest = async (keywords) => {
  return await api.get('/search/suggest', { params: { keywords } })
}

// 推荐歌单
export const getPersonalized = async (limit = 30) => {
  return await api.get('/personalized/playlist', { params: { limit } })
}

// 推荐新歌
export const getNewSongs = async () => {
  return await api.get('/personalized/newsong', {})
}

// 热门歌手
export const getHotSinger = async () => {
  return await api.get('/top/artists', { params: { offset: 0, limit: 30 } })
}

// 歌手列表
export const getSingerList = async (params = {}) => {
  return await api.get('/artist/list', { params })
}

// 歌手详情
export const getArtists = async (id) => {
  return await api.get('/artists', { params: { id } })
}

// 排行榜
export const getToplist = async () => {
  return await api.get('/toplist/detail', {})
}

// 歌单分类
export const getCatList = async () => {
  return await api.get('/playlist/catlist', {})
}

// 歌单详情
export const getPlayListDetail = async (params = {}) => {
  const { id, s = 8 } = params
  return await api.get('/playlist/detail', { params: { id, s } })
}

// 歌曲详情
export const getSongDetail = async (ids) => {
  return await api.get('/song/detail', { params: { ids } })
}

// 歌词
export const getLyric = async (id) => {
  if (!id) throw new Error('歌曲ID不能为空')
  return await api.get('/lyric/new', { params: { id } })
}

// 歌曲地址
export const getSongUrl = async (id) => {
  if (!id) throw new Error('歌曲ID不能为空')
  return await api.get('/song/url', { params: { id } })
}

// MV相关函数 - 确保每个函数只声明一次
export const getMvAll = async (params = {}) => {
  return await api.get('/mv/all', { params })
}

export const getMvDetail = async (mvid) => {
  if (!mvid) throw new Error('MV ID不能为空')
  return await api.get('/mv/detail', { params: { mvid } })
}

export const getMvUrl = async (id) => {
  if (!id) throw new Error('MV ID不能为空')
  return await api.get('/mv/url', { params: { id } })
}

export const getMvDetailInfo = async (mvid) => {
  if (!mvid) throw new Error('MV ID不能为空')
  return await api.get('/mv/detail/info', { params: { mvid } })
}

export const getMvRelated = async (mvid) => {
  if (!mvid) throw new Error('MV ID不能为空')
  return await api.get('/simi/mv', { params: { mvid } })
}

export const getMvComments = async (params = {}) => {
  return await api.get('/comment/mv', { params })
}

// 专辑
export const getAlbumData = async (id) => {
  return await api.get('/album', { params: { id } })
}

// 默认导出 - 确保每个函数只出现一次
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
  getMvAll,
  getMvDetail,
  getMvUrl,
  getMvDetailInfo,
  getMvRelated,
  getMvComments,
  getAlbumData,
  SEARCH_TYPE,
  RESOURCE_TYPE
}