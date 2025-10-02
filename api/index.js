import api from './instance.js'
import { SEARCH_TYPE, RESOURCE_TYPE } from './config.js'

/**
 * @method 获取轮播图
 */
export const getBanner = async (type = 0) => {
  return await api.get('/banner', { params: { type } })
}

/**
 * @method 获取热搜列表
 */
export const getSearchHot = async () => {
  return await api.get('/search/hot/detail', {})
}

/**
 * @method 搜索
 */
export const search = async (params = {}) => {
  const { keywords, limit = 30, offset = 0, type = SEARCH_TYPE.SONG } = params
  return await api.get('/cloudsearch', { 
    params: { keywords, limit, offset, type } 
  })
}

/**
 * @method 搜索建议
 */
export const searchSuggest = async (keywords) => {
  return await api.get('/search/suggest', { params: { keywords } })
}

/**
 * @method 获取推荐歌单
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
 */
export const getSingerList = async (params = {}) => {
  return await api.get('/artist/list', { params })
}

/**
 * @method 获取歌手单曲
 */
export const getArtists = async (id) => {
  return await api.get('/artists', { params: { id } })
}

/**
 * @method 获取歌手mv
 */
export const getArtistMv = async (params = {}) => {
  return await api.get('/artist/mv', { params })
}

/**
 * @method 获取歌手专辑
 */
export const getArtistAlbum = async (params = {}) => {
  return await api.get('/artist/album', { params })
}

/**
 * @method 获取歌手描述
 */
export const getArtistDesc = async (id) => {
  return await api.get('/artist/desc', { params: { id } })
}

/**
 * @method 获取相似歌手
 */
export const getArtistSimi = async (id) => {
  return await api.get('/simi/artist', { params: { id } })
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
 * @method 获取热门歌单分类
 */
export const getHotlist = async () => {
  return await api.get('/playlist/hot', {})
}

/**
 * @method 获取歌单
 */
export const getPlayList = async (params = {}) => {
  return await api.get('/top/playlist', { params })
}

/**
 * @method 获取歌单详情
 */
export const getPlayListDetail = async (params = {}) => {
  const { id, s = 8 } = params
  return await api.get('/playlist/detail', { params: { id, s } })
}

/**
 * @method 获取歌曲详情
 */
export const getSongDetail = async (ids) => {
  return await api.get('/song/detail', { params: { ids } })
}

/**
 * @method 相关歌单推荐
 */
export const getRelatedPlaylist = async (id) => {
  return await api.get('/related/playlist', { params: { id } })
}

/**
 * @method 获取相似歌单
 */
export const getSimiPlaylist = async (id) => {
  return await api.get('/simi/playlist', { params: { id } })
}

/**
 * @method 歌单评论
 */
export const getCommentPlaylist = async (params = {}) => {
  return await api.get('/comment/playlist', { params })
}

/**
 * @method 歌单收藏者
 */
export const getSubscribersPlaylist = async (params = {}) => {
  return await api.get('/playlist/subscribers', { params })
}

/**
 * @method 获取视频分类列表
 */
export const getVideoCategory = async () => {
  return await api.get('/video/category/list', {})
}

/**
 * @method 获取视频标签列表
 */
export const getVideoTag = async () => {
  return await api.get('/video/group/list', {})
}

/**
 * @method 获取全部视频列表
 */
export const getVideoAll = async (offset = 0) => {
  return await api.get('/video/timeline/all', { params: { offset } })
}

/**
 * @method 获取视频标签/分类下的视频
 */
export const getVideoOther = async (id, offset = 0) => {
  return await api.get('/video/group', { params: { id, offset } })
}

/**
 * @method 获取全部mv
 */
export const getMvAll = async (params = {}) => {
  return await api.get('/mv/all', { params })
}

/**
 * @method 获取视频播放地址
 */
export const getVideoUrl = async (id) => {
  return await api.get('/video/url', { params: { id } })
}

/**
 * @method 获取视频详情
 */
export const getVideoDetail = async (id) => {
  return await api.get('/video/detail', { params: { id } })
}

/**
 * @method 获取视频点赞转发评论数数据
 */
export const getVideoDetailInfo = async (vid) => {
  return await api.get('/video/detail/info', { params: { vid } })
}

/**
 * @method 相关视频
 */
export const getVideoRelated = async (id) => {
  return await api.get('/related/allvideo', { params: { id } })
}

/**
 * @method 视频评论
 */
export const getVideoComments = async (params = {}) => {
  return await api.get('/comment/video', { params })
}

/**
 * @method 发送评论
 */
export const sendComment = async (params = {}) => {
  return await api.get('/comment', { params })
}

/**
 * @method 给评论点赞
 */
export const likeComment = async (params = {}) => {
  return await api.get('/comment/like', { params })
}

/**
 * @method 资源点赞
 */
export const likeResource = async (type, t, id) => {
  return await api.get('/resource/like', { params: { type, t, id } })
}

/**
 * @method 获取mv详情
 */
export const getMvDetail = async (mvid) => {
  return await api.get('/mv/detail', { params: { mvid } })
}

/**
 * @method 获取mv点赞转发评论数数据
 */
export const getMvDetailInfo = async (mvid) => {
  return await api.get('/mv/detail/info', { params: { mvid } })
}

/**
 * @method 获取mv播放地址
 */
export const getMvUrl = async (id) => {
  return await api.get('/mv/url', { params: { id } })
}

/**
 * @method mv评论
 */
export const getMvComments = async (params = {}) => {
  return await api.get('/comment/mv', { params })
}

/**
 * @method 相似mv
 */
export const getMvRelated = async (mvid) => {
  return await api.get('/simi/mv', { params: { mvid } })
}

/**
 * @method 获取歌曲播放地址 - 修复版本
 */
export const getSongUrl = async (id) => {
  if (!id) {
    throw new Error('歌曲ID不能为空')
  }
  
  return await api.get('/song/url', { 
    params: { id } 
  })
}

/**
 * @method 获取歌词 - 修复版本
 */
export const getLyric = async (id) => {
  if (!id) {
    throw new Error('歌曲ID不能为空')
  }
  
  return await api.get('/lyric', { 
    params: { id } 
  })
}

/**
 * @method 收藏/取消收藏歌单
 */
export const collectPlaylist = async (t, id) => {
  return await api.get('/playlist/subscribe', { params: { t, id } })
}

/**
 * @method 获取专辑内容
 */
export const getAlbumData = async (id) => {
  return await api.get('/album', { params: { id } })
}

/**
 * @method 获取专辑评论
 */
export const getAlbumComment = async (params = {}) => {
  return await api.get('/comment/album', { params })
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
  getArtistMv,
  getArtistAlbum,
  getArtistDesc,
  getArtistSimi,
  getToplist,
  getCatList,
  getHotlist,
  getPlayList,
  getPlayListDetail,
  getSongDetail,
  getRelatedPlaylist,
  getSimiPlaylist,
  getCommentPlaylist,
  getSubscribersPlaylist,
  getVideoCategory,
  getVideoTag,
  getVideoAll,
  getVideoOther,
  getMvAll,
  getVideoUrl,
  getVideoDetail,
  getVideoDetailInfo,
  getVideoRelated,
  getVideoComments,
  sendComment,
  likeComment,
  likeResource,
  getMvDetail,
  getMvDetailInfo,
  getMvUrl,
  getMvComments,
  getMvRelated,
  getLyric,
  collectPlaylist,
  getAlbumData,
  getAlbumComment,
  SEARCH_TYPE,
  RESOURCE_TYPE
}