<template>
  <div>
    <button @click="increaseCount">{{ count }}</button>
  </div>
</template>
<script>
export default {
  name: 'CounterButton',
  props: {
    count: {
      type: Number,
      required: false,
      default: 0,
    },
  },
  model: {
    prop: 'count',
    event: 'increment',
  },
  methods: {
    increaseCount() {
      this.$emit('increment', this.count + 1);
    },
  },
};
</script>
<style></style>
