<template>
  <header id="site-header">
    <div class="container container--flex">
      <router-link :to="{ name: 'home' }" class="brand">Bầu Cử BĐH</router-link>

      <div class="form-group">
        {{ t('total_electors') }}
        <input type="text" class="total-electors"
              placeholder="1"
              v-model="totalElectors">
      </div>

      <nav class="header-menu">
        <button class="button" @click.prevent="deleteAllData">{{ t('delete_data') }}</button>
        <span class="lang-switcher">
          <a href="#" @click.prevent="changeLang('vi')" :class="{ 'active': lang === 'vi' }">{{ t('vi') }}</a>
          <a href="#" @click.prevent="changeLang('en')" :class="{ 'active': lang === 'en' }">{{ t('en') }}</a>
        </span>
      </nav>
    </div>
  </header><!-- ./#site-header -->
</template>

<script>
import swal from 'sweetalert2'
export default {
  data () {
    return {
      totalElectors: this.$store.getters.totalElectors || 1,
      lang: 'en'
    }
  },
  watch: {
    totalElectors (newVal, oldVal) {
      let total = isNaN(parseInt(newVal)) ? 0 : parseInt(newVal)
      this.totalElectors = total
      this.$store.dispatch('setTotalElectors', parseInt(total))
    }
  },
  methods: {
    deleteAllData () {
      swal({
        title: this.t('delete_data_notice'),
        text: this.t('delete_data_notice_desc'),
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: this.t('confirm_button_text'),
        cancelButtonText: this.t('cancel_button_text')
      }).then((result) => {
        if (result.value) {
          this.totalElectors = ''
          this.$store.dispatch('deleteAllData')
          swal(
            this.t('deleted_text'),
            '',
            'success'
          )
        }
      })
    },
    changeLang (lang) {
      this.lang = lang
      this.$translate.setLang(lang)
    }
  }
}
</script>


<style lang="scss" scoped>
  .total-electors {
    font-size: 1em;
    font-weight: 700;
  }

  .form-group {
    margin-top: 0;
    margin-bottom: 0;
    font-weight: 700;
    input {
      min-width: auto;
      width: 50px;
    }
  }

  .lang-switcher {
    padding-left: 20px;
    a {
      margin: 0 5px;
    }
    .active {
      font-weight: 700;
      color: $color--dark !important;
    }
  }
</style>
