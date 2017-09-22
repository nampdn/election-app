<template>
  <main id="content">
    <div class="panel panel--left">
      <candidate-form></candidate-form>
      <candidate-list :candidates="candidates"></candidate-list>
    </div><!-- /.panel--left -->
    <div class="panel panel--right">
      <div class="filters-header">
        <strong>Lọc: </strong>
        <nav class="filters">
          <a href="#" :class="{ 'active': filter === 'all' }" @click.prevent="filter = 'all'">Tất cả</a>
          |
          <a href="#" :class="{ 'active': filter === 'pass' }" @click.prevent="filter = 'pass'">Quá bán</a>
        </nav>
      </div>
      <result-table :results="filteredResults"></result-table>
    </div>
  </main>  
</template>

<script>
import { mapGetters } from 'vuex'
import CandidateForm from '@/components/CandidateForm'
import CandidateList from '@/components/CandidateList'
import ResultTable from '@/components/ResultTable'

const filtered = {
  all: candidates => candidates,
  pass: candidates => candidates.filter(candidate => candidate.passed === true)
}
export default {
  computed: {
    ...mapGetters([
      'candidates'
    ]),
    filteredResults () {
      return filtered[this.filter](this.candidates)
    }
  },
  data () {
    return {
      filter: 'all'
    }
  },
  components: {
    CandidateForm,
    CandidateList,
    ResultTable
  }
}
</script>

<style lang="scss" scoped>
  #content {
    display: flex;
  }
  
  .panel {
    display: flex;
    flex-flow: column nowrap;
    &--left {
      width: 50%;
    }
    &--right {
      width: 50%;
      background-color: $color--gray;
    }
  }

  .filters-header {
    display: flex;
    align-content: center;
    padding: 15px 20px;
    border-bottom: 1px solid $color--gray;
    strong {
      font-weight: 700;
    }
    a {
      color: $color--gray-text;
      text-decoration: none;
      &.active,
      &:hover {
        font-weight: 700;
        text-decoration: underline;
        color: $color--primary;
      }
    }
  }
</style>

