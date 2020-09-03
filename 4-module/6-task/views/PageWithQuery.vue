<template>
  <div class="container">
    <meetups-view
      :view="view"
      v-on:update:view="view = $event"
      :date="date"
      v-on:update:date="date = $event"
      :participation="participation"
      v-on:update:participation="participation = $event"
      :search="search"
      v-on:update:search="search = $event"
    />
  </div>
</template>

<script>
import MeetupsView from '../components/MeetupsView';

export default {
  name: 'PageWithQuery',
  components: { MeetupsView },
  data() {
    return {
      default: {
        view: 'list',
        date: 'all',
        participation: 'all',
        search: '',
      },
      view: 'list',
      date: 'all',
      participation: 'all',
      search: '',
    };
  },
  beforeMount() {
    if (typeof this.$route.query.view !== 'undefined') {
      this.view = this.$route.query.view;
    }
    if (typeof this.$route.query.date !== 'undefined') {
      this.date = this.$route.query.date;
    }
    if (typeof this.$route.query.participation !== 'undefined') {
      this.participation = this.$route.query.participation;
    }
    if (typeof this.$route.query.search !== 'undefined') {
      this.search = this.$route.query.search;
    }
  },
  watch: {
    view: 'handleViewChanges',
    date: 'handleDateChanges',
    participation: 'handleParticipationChanges',
    search: 'handleSearchChanges',
    $route(to, from) {
      if (typeof to.query.view !== 'undefined') {
        this.view = to.query.view;
        this.handleViewChanges();
      }
      if (typeof to.query.date !== 'undefined') {
        this.date = to.query.date;
        this.handleDateChanges();
      }
      if (typeof to.query.participation !== 'undefined') {
        this.participation = to.query.participation;
        this.handleParticipationChanges();
      }
      if (typeof to.query.search !== 'undefined') {
        this.search = to.query.search;
        this.handleSearchChanges();
      }
    },
  },
  methods: {
    handleViewChanges() {
      const query = { ...this.$route.query };
      if (this.view !== this.default.view) {
        query.view = this.view;
      } else {
        delete query.view;
      }
      this.$router
        .replace({          // Я использовал replace, а не push по той причине, что
          path: '/',        // мы фактически, меняя параметры, остаёмся на одной и той же странице, влияя только на список митапов.
          query,            // Нет логики в применении push в данном случае. К тому же, если бы фильтров было гораздо больше,
        })                  // то мы бы могли 'забить' стек адресов, если бы использовали push и нам было бы затруднительно вернуться на страницу, предшествующую настройке.
        .catch(() => {});
    },
    handleDateChanges() {
      const query = { ...this.$route.query };
      if (this.date !== this.default.date) {
        query.date = this.date;
      } else {
        delete query.date;
      }
      this.$router
        .replace({
          path: '/',
          query,
        })
        .catch(() => {});
    },
    handleParticipationChanges() {
      const query = { ...this.$route.query };
      if (this.participation !== this.default.participation) {
        query.participation = this.participation;
      } else {
        delete query.participation;
      }
      this.$router
        .replace({
          path: '/',
          query,
        })
        .catch(() => {});
    },
    handleSearchChanges() {
      const query = { ...this.$route.query };
      if (this.search !== this.default.search) {
        query.search = this.search;
      } else {
        delete query.search;
      }
      this.$router
        .replace({
          path: '/',
          query,
        })
        .catch(() => {});
    },
  },
};
</script>

<style scoped></style>
