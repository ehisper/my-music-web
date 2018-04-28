import {getLyric} from 'api/song'
import {ERR_OK} from 'api/config'
import {Base64} from 'js-base64'
export default class Song {
  constructor ({id, mid, singer, name, album, duration, image, url}) {
    this.id = id
    this.mid = mid
    this.singer = singer
    this.name = name
    this.album = album
    this.duration = duration
    this.image = image
    this.url = url
  }

  getLyric() {
    if (this.lyric) {
      return Promise.resolve(this.lyric)
    }
    return new Promise((resolve, reject) => {
      getLyric(this.mid).then((res) => {
        if (res.retcode === ERR_OK) {
          this.lyric = Base64.decode(res.lyric)
          resolve(this.lyric)
        } else {
          reject(new Error('no lyric'))
        }
      })
    })
  }
}

export function createSong (musicData) {
  return new Song({
    id: musicData.songid,
    mid: musicData.songmid,
    singer: filterSinger(musicData.singer),
    name: musicData.songname,
    album: musicData.albumname,
    duration: musicData.interval,
    image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`,
    url: `http://ws.stream.qqmusic.qq.com/${musicData.songid}.m4a?fromtag=46`
    // url403forbid
    // http://dl.stream.qqmusic.qq.com/C4000047VwdV487b7t.m4a?guid=7482583416&vkey=9F9C87E8A6E56AA01B5E2A03C95E0E30310B2099ED03C1A838C6BA2B5AF6E6FB56391E4043B797B7038D6B01DE3ED89B6DB3435E3ED81530&uin=0&fromtag=38
    // http://dl.stream.qqmusic.qq.com/C400001Qu4I30eVFYb.m4a?guid=7482583416&vkey=7E098EBDDA5EDCEF5B51BC681FFA8D933F0053919A46F8F7C53A993213724E2655E891D53C18B423300F14E1BB39E79150126670CA6ECB1D&uin=0&fromtag=38
  })
}

export function filterSinger (singer) {
  let ret = []
  if (!singer) {
    return ''
  }
  singer.forEach((s) => {
    ret.push(s.name)
  })
  return ret.join('/')
}
