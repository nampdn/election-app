<template>
  <div class="candidate-list">
      <candidate-item v-for="(candidate, index) in candidates" 
        :key="index" :data="candidate" :order="index"></candidate-item>
  </div><!-- /.candidate-list -->
</template>

<script>
import CandidateItem from './CandidateItem'
export default {
  props: {
    candidates: {
      required: true
    }
  },
  components: {
    CandidateItem
  }
}
</script>

<style lang="scss" scoped>
</style>

