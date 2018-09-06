<template>
  <div id="app">
    <site-header></site-header>
    <router-view></router-view>
    <site-footer></site-footer>
  </div>
</template>

<script>
import SiteHeader from '@/components/shared/SiteHeader'
import SiteFooter from '@/components/shared/SiteFooter'
export default {
  name: 'app',
  components: {
    SiteHeader,
    SiteFooter
  }
}
</script>

<style lang="scss">
  @import "./assets/scss/main.scss";
  body, html {
    height: 100%;
  }
  #app {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
</style>
