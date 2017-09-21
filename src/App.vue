<template>
  <div id="app">
    <site-header></site-header>
    <main id="main">
      <router-view></router-view>
    </main>
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
#main {
  margin-top: 100px;
}
</style>
