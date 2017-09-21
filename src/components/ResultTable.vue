<template>
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
    <tr v-for="(candidate, index) in results" :key="index" :class="{ 'pass': candidate.votes >= totalElectors / 2 }">
      <td v-text="index + 1"></td>
      <td class="name" nowrap v-text="candidate.name"></td>
      <td class="votes" v-text="candidate.votes"></td>
      <td class="percent">{{ candidate.votes / totalElectors | votesPercent }}</td>
    </tr>
  </tbody>
</table>
</template>

<script>
  export default {
    props: {
      results: {
        required: true
      }
    },
    computed: {
      totalElectors () {
        return this.$store.getters.totalElectors
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
      &.pass {
        background-color: $color--success;
      }
    }
  }
}
</style>
