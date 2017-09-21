<template>
<div class="results-sidebar">
  <div class="filters-header">
    <strong>Lọc: </strong>
    <nav class="filters">
      <a href="#" :class="{ 'active': filter === 'all' }" @click.prevent="filter = 'all'">Tất cả</a>
      |
      <a href="#" :class="{ 'active': filter === 'pass' }" @click.prevent="filter = 'pass'">Quá bán</a>
    </nav>
  </div>
  <div class="results-table-wrap">
    <table class="results-list-table">
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
          <td class="percent">{{ candidate.votes | votesInPercent(totalElectors) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
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
      votesInPercent (votes, total) {
        if (total === 0) {
          return '0.00%'
        }
        return (votes * 100 / total).toFixed(2) + '%'
      }
    }
  }
</script>

<style lang="scss" scoped>
  .results-sidebar {
    display: flex;
    flex-flow: column nowrap;
    height: 100%;
  }
  .filters-header {
    display: flex;
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
  .results-table-wrap {
    padding: 20px;
    flex: 1;
    overflow-y: auto;
  }
  .results-list-table {
    width: 100%;
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
