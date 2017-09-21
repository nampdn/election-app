<template>
  <div class="container">
    <div class="left">
      <form class="candidate-form">
        <div class="form-group">
          <input type="text" 
                placeholder="Tên ứng viên"
                class="candidate-form__name"
                v-model="candidateName"
                @keypress.enter.prevent="addCandidate">
          <button class="candidate-form__add button">Thêm</button>
        </div>
      </form><!-- /.candidate-form -->

      <div class="candidate-list-wrap">
        <candidate-list :candidates="candidates"></candidate-list>
      </div><!-- /.candidate-list-wrap -->
    </div>

    <div class="right">
      <result-table :results="candidates"></result-table>
    </div>
  </div>
</template>

<script>
import CandidateList from '@/components/CandidateList'
import ResultTable from '@/components/ResultTable'
import { mapGetters } from 'vuex'
export default {
  components: {
    CandidateList,
    ResultTable
  },
  data () {
    return {
      candidateName: ''
    }
  },
  computed: {
    ...mapGetters([
      'candidates',
      'totalElectors'
    ])
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
  .container {
    position: relative;
    .left {
      width: 60%;
      padding-right: 50px;
      box-sizing: border-box;
    }
    .right {
      position: fixed;
      width: 40%;
      right: 0;
      top: 63px;
      background: #efefef;
      height: 100%;
      box-sizing: border-box;
    }
  }
</style>

