<template>
  <header id="site-header">
    <div class="container container--flex">
      <router-link :to="{ name: 'home' }" class="brand">Bầu Cử BĐH</router-link>

      <div class="form-group">
        <input type="text" class="total-electors" 
              placeholder="Tổng số phiếu bầu"
              v-model="totalElectors">  
      </div>

      <nav class="header-menu">
        <button class="button" @click.prevent="deleteAllData">Xóa dữ liệu</button>
      </nav>
    </div>
  </header><!-- ./#site-header -->
</template>

<script>
export default {
  data () {
    return {
      totalElectors: this.$store.getters.totalElectors
    }
  },
  watch: {
    totalElectors (newVal, oldVal) {
      let total = isNaN(parseInt(newVal)) ? 0 : parseInt(newVal)
      this.$store.dispatch('setTotalElectors', parseInt(total))
    }
  },
  methods: {
    deleteAllData () {
      let confirmed = confirm('Bạn có chắc xóa toàn bộ dữ liệu?')
      if (!confirmed) {
        return
      }
      this.$store.dispatch('deleteAllData')
    }
  }
}
</script>


<style lang="scss" scoped>
  #site-header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 99999;
  }

  .total-electors {
    font-size: 1.5em;
    font-weight: 700;
  }

  .form-group {
    margin-top: 0;
    margin-bottom: 0;
  }
</style>
