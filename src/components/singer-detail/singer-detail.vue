<template>
  <transition name="slide">
  <div class="singer-detail"></div>

  </transition>
</template>

<script type="text/ecmascript-6">
import {mapGetters} from 'vuex'
import {getSingerDetail} from 'api/singer'
import {ERR_OK} from 'api/config'

export default {
  computed: {
    ...mapGetters([
      'singer'
      ])
  },
  created() {
    console.log(this.singer)
    this._getDetail()
  },
  methods: {
    _getDetail() {
      if (!this.singer.id) {
        this.$router.push('/singer')
        return
      }
      getSingerDetail(this.singer.id)
      .then(res => {
        if(res.code == ERR_OK) {
          console.log(res.data.list)
          // this.data = res.data
        }
      })
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.singer-detail{
  position: fixed;
  top: 0;
  z-index: 100;
  width: 100%;
  height: 100%;
  background-color: black;
}

  .slide-enter-active, .slide-leave-active
    transition: all .3s

  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>
