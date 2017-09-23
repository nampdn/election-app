<template>
  <form class="candidate-form">
    <div class="form-group">
      <input type="text" 
            :placeholder="t('candidate_name')"
            class="candidate-form__name"
            v-model="candidateName"
            @keypress.enter.prevent="addCandidate">
      <button class="candidate-form__add button" @click.prevent="addCandidate">{{ t('candidate_add') }}</button>
    </div>
  </form><!-- /.candidate-form -->
</template>

<script>
export default {
  data () {
    return {
      candidateName: ''
    }
  },
  methods: {
    addCandidate () {
      if (this.candidateName === '') {
        return
      }
      this.$store.dispatch('addCandidate', this.candidateName)
      this.candidateName = ''
    }
  }
}
</script>

<style lang="scss" scoped>
  .form-group {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin: 0;
    padding: 0 20px;
    margin-top: 15px;
    box-sizing: border-box;
    input {
      flex: 1 1 auto;
    }
  }
</style>
