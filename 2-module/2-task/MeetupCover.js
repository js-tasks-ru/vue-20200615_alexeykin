export const MeetupCover = {
  template: `<div class="meetup-cover" :style="style">
        <h1 class="meetup-cover__title">{{ title }}</h1>
    </div>`,

  props: {
    link: String,
    title: String,
  },

  computed: {
    style() {
      return {
        '--bg-url': this.link ? `url(${this.link})` : '',
      };
    },
  },
};
