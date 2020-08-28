<template>
  <div class="page page_meetup-forms">
    <div class="container">
      <h2 class="page__title">{{ title }}</h2>
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'FormLayout',
  props: {
    title: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped>
.page {
  padding: 48px 0;
}
.page.page_meetup-forms {
  padding: 70px 0;
}
.container {
  max-width: 1008px;
  width: 100%;
  margin: 0 auto;
}
@media all and (max-width: 992px) {
  .container {
    padding: 0 16px;
  }
  .page.page_meetup-forms {
    padding: 48px 0;
  }
}
.page__title {
  font-family: Roboto, sans-serif;
  font-weight: 700;
  font-size: 32px;
  line-height: 37px;
  color: var(--body-color);
  margin: 0 0 32px;
}
</style>
