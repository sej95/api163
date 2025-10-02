// API配置
export const API_CONFIG = {
  baseURL: 'https://music.163.com/api',
  timeout: 10000
}

// 搜索类型常量
export const SEARCH_TYPE = {
  SONG: 1,        // 单曲
  ALBUM: 10,      // 专辑
  ARTIST: 100,    // 歌手
  PLAYLIST: 1000, // 歌单
  USER: 1002,     // 用户
  MV: 1004,       // MV
  LYRIC: 1006,    // 歌词
  RADIO: 1009,    // 电台
  VIDEO: 1014,    // 视频
  COMPREHENSIVE: 1018 // 综合
}

// 资源类型常量
export const RESOURCE_TYPE = {
  SONG: 0,
  MV: 1,
  PLAYLIST: 2,
  ALBUM: 3,
  RADIO: 4,
  VIDEO: 5,
  DYNAMIC: 6
}