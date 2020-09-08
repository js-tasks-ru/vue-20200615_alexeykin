<template>
  <div>
    <the-header />
    <slot />
    <the-footer />
  </div>
</template>

<script>
import TheHeader from '../components/TheHeader';
import TheFooter from '../components/TheFooter';
export default {
  name: 'BaseLayout',
  components: { TheHeader, TheFooter },
};
</script>

<style scoped></style>
