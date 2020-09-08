<template>
  <footer class="footer">
    <div class="container">
      © 2020. learn.javascript.ru
      <a href="https://learn.javascript.ru/courses/vue">Vue.js Course</a>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'TheFooter',
};
</script>

<style scoped>
@media all and (min-width: 992px) {
  .footer {
    padding: 100px 0 60px;
    text-align: center;
  }
}
</style>
