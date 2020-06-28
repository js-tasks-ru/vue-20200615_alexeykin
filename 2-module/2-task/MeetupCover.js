export const MeetupCover = {
  template: `<div class="meetup-cover" :style="link ? style : {}">
        <h1 class="meetup-cover__title">{{ title }}</h1>
    </div>`,

  props: {
    link: String,
    title: String,
  },

  computed: {
    style() {
      return {
        '--bg-url': `url(${this.link})`,
      };
    },
  },
};
