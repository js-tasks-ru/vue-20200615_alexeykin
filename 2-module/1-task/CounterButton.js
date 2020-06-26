export const CounterButton = {
  // Шаблон потребуется отредактировать
  template:
    '<button type="button" @click="change">{{ count }}</button>',

  // Компонент должен иметь пропс
  props: {
    count: {
      type: Number,
      required: false,
      default: 0,
    },
  },

  // Компонент должен иметь модель
  model: {
    prop: 'count',
    event: 'increment',
  },

  // Шаблон лучше иметь максимально простым, а логику выносить в методы
  methods: {
    change() {
      this.$emit('increment', this.count + 1);
    },
  },
};
