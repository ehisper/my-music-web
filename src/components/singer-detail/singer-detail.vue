<template>
  <transition name="slide">
  <div class="singer-detail"></div>

  </transition>
</template>

<script type="text/ecmascript-6">
import {mapGetters} from 'vuex'
export default {
  computed: {
    ...mapGetters([
      'singer'
      ])
  },
  created() {
    console.log(this.singer)
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
