<template>
  <transition name='slide'>
    <music-list :songs="songs" :title="title" :bg-image="bgImage"></music-list>
  </transition>
</template>
<script>
  import MusicList from 'components/music-list/music-list'
  import {mapGetters} from 'vuex'
  import {getSongList} from 'api/recommend'
  import {ERR_OK} from 'api/config'

  export default {
    // name:,
    data() {
      return {
      }
    },
    created() {
      // console.log('this.disc',this.disc)
      this._getSongList()
    },
    mounted() {

    },
    computed: {
      title() {
        return this.disc.dissname
      },
      bgImage() {
        return this.disc.imgUrl
      },
      ...mapGetters([
        'disc'
      ])
    },
    methods: {
      _getSongList() {
        getSongList(this.disc.dissid).then((res) => {
          // console.log('getSongList - res' ,res) // 非法referer???
          if (res.code === ERR_OK) {
            this.songs = this._normalizeSongs(res.cdlist[0].songlist)
          }
        })
      }
    },
    components: {
      MusicList
    },
    watch: {

    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s
  .slider-enter, .slider-leave
    transform: translate3d(100%, 0, 0)
</style>
