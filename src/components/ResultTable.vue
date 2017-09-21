<template>
<div>
  <div class="filters-header">
    <strong>Lọc: </strong>
    <nav class="filters">
      <a href="#" :class="{ 'active': filter === 'all' }" @click.prevent="filter = 'all'">Tất cả</a>
      |
      <a href="#" :class="{ 'active': filter === 'pass' }" @click.prevent="filter = 'pass'">Quá bán</a>
    </nav>
  </div>
  <table class="election-results-table">
    <thead>
      <tr>
        <th>#</th>
        <th>Họ & Tên</th>
        <th><a href="#" class="sort-header" @click.prevent="key = 'sort'">Số phiếu</a></th>
        <th><a href="#" class="sort-header" @click.prevent="key = 'sort'">Phần trăm</a></th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="(candidate, index) in filteredResults" :key="index" :class="{ 'pass': candidate.passed }">
        <td v-text="index + 1"></td>
        <td class="name" nowrap v-text="candidate.name"></td>
        <td class="votes" v-text="candidate.votes"></td>
        <td class="percent">{{ candidate.votes / totalElectors | votesPercent }}</td>
      </tr>
    </tbody>
  </table>
</div>
</template>

<script>
  const filtered = {
    all: candidates => candidates,
    pass: candidates => candidates.filter(candidate => candidate.passed === true)
  }
  export default {
    props: {
      results: {
        required: true
      }
    },
    data () {
      return {
        filter: 'all'
      }
    },
    computed: {
      totalElectors () {
        return this.$store.getters.totalElectors
      },
      filteredResults () {
        return filtered[this.filter](this.results)
      }
    },
    methods: {
    },
    filters: {
      votesPercent (percent) {
        return (percent * 100).toFixed(2) + '%'
      }
    }
  }
</script>

<style lang="scss" scoped>
.filters-header {
  display: flex;
  margin-bottom: 10px;
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
    .sort-header {
      color: #fff;
    }
  }
  tbody {
    tr {
      background-color: $color--gray;
      &.pass {
        background-color: $color--success;
      }
    }
  }
}
</style>
