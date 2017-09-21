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
      <table class="election-results-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Họ & Tên</th>
            <th>Số phiếu</th>
            <th>Phần trăm</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(candidate, index) in candidates" :key="candidate.id">
            <td v-text="index + 1"></td>
            <td class="name" nowrap v-text="candidate.name"></td>
            <td class="votes" v-text="candidate.votes"></td>
            <td class="percent">{{ candidate.votes / totalElectors | votesPercent }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import CandidateList from '@/components/CandidateList'
import { mapGetters } from 'vuex'
export default {
  components: {
    CandidateList
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
  },
  filters: {
    votesPercent (percent) {
      return (percent * 100).toFixed(2) + '%'
    }
  }
}
</script>

<style lang="scss" scoped>
  .container {
    position: relative;
    .left {
      width: 55%;
      padding-right: 50px;
      box-sizing: border-box;
    }
    .right {
      position: absolute;
      width: 45%;
      right: 0;
      top: 0;
    }
  }
  .election-results-table {
    position: fixed;
    border-left: 1px solid $color--gray;
    border-bottom: 1px solid $color--gray;
    th, td {
      border-right: 1px solid $color--gray;
      border-top: 1px solid $color--gray;
      text-align: left;
      padding: 2px 10px;
      font-size: 22px;
    }
    td {
      font-weight: 700;
      &.name {
        font-weight: normal;
      }
    }
    thead {
      tr {
        background-color: $color--dark;
        color: #fff;
      }
    }
    tbody {
      tr {
        background-color: $color--gray;
      }
    }
  }
</style>

