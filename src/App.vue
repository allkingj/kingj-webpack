<template>
  <div class="pro-root">
    <header class="pro-roo__header">头部组件</header>
    <router-view></router-view>
    <footer class="pro-roo__footer">底部组件</footer>
  </div>
</template>

<script>

export default {
  name: 'app',
  components: {
  }
}
</script>

<style lang="less" scoped>
  .pro-root {
    height: 100%;
  }
</style>
