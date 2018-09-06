<template>
  <div class="wrap">
    <table class="results-list-table">
      <thead>
        <tr>
          <th>#</th>
          <th>{{ t('column_name') }}</th>
          <th><a href="#" class="sort-header" @click.prevent="key = 'sort'">{{ t('column_votes') }}</a></th>
          <th><a href="#" class="sort-header" @click.prevent="key = 'sort'">{{ t('column_percent') }}</a></th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="(candidate, index) in results" :key="index" :class="{ 'pass': candidate.passed }">
          <td v-text="index + 1"></td>
          <td class="name" nowrap v-text="candidate.name"></td>
          <td class="votes" v-text="candidate.votes"></td>
          <td class="percent">{{ candidate.votes | votesInPercent(totalElectors) }}</td>
        </tr>
      </tbody>

      <tfoot>
        <tr>
          <th>#</th>
          <th>{{ t('column_name') }}</th>
          <th><a href="#" class="sort-header" @click.prevent="key = 'sort'">{{ t('column_votes') }}</a></th>
          <th><a href="#" class="sort-header" @click.prevent="key = 'sort'">{{ t('column_percent') }}</a></th>
        </tr>
      </tfoot>
    </table>
  </div>
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
  .wrap {
    flex: 1;
    overflow-y: auto;
    height: 100vh;
    padding: 20px;
  }
  .results-list-table {
    width: 100%;
    border-left: 1px solid $color--gray;
    border-bottom: 1px solid $color--gray;
    th, td {
      border-right: 1px solid $color--gray;
      border-top: 1px solid $color--gray;
      text-align: left;
      padding: 5px 10px;
      font-size: 22px;
    }
    th {
      font-size: 18px;
    }
    td {
      font-weight: 700;
      &.name {
        font-weight: normal;
      }
    }
    thead, tfoot {
      tr {
        background-color: #fff;
        color: $color--dark;
      }
      .sort-header {
        color: $color--dark;
      }
    }
    thead {
      th {
        border-bottom: 2px solid $color--gray;
      }
    }
    tbody {
      tr {
        background-color: #fff;
        &.pass {
          background-color: $color--success;
        }
      }
    }
  }
</style>
