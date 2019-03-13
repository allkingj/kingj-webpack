<template>
  <div class="home-root">
    <header class="home-root__header">头部组件</header>
    <section class="home_root__body">内容组件</section>
    <footer class="home_root__footer">底部组件</footer>
    <ElMenu></ElMenu>
  </div>
</template>

<script>
import ElMenu from '@/components/base/menu/src/menu'

export default {
  name: 'app',
  components: {
    ElMenu
  },
  props: {},
  data () {
    return {

    }
  },
  computed: {},
  methods: {

  },
  created () {},
  mounted () {}
}
</script>

<style lang='less' >
  .home_root {
    &__header {
      height: 60px;
    }

    &__body {
      height: 60px;
    }

    &__footer {
      height: 60px;
    }
  }
</style>
