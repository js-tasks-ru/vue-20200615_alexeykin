import { MeetupView } from './MeetupView.js';
import { MEETUP_ID, fetchMeetup } from './data.js';

export const MeetupPage = {
  name: 'MeetupPage',

  template: `<meetup-view :meetup="meetup"></meetup-view>`,

  components: {
    MeetupView,
  },

  data() {
    return {
      meetup: {},
    };
  },

  async mounted() {
    this.setMeetupInfo(await this.fetchData());
  },

  methods: {
    async fetchData() {
      const meetupInfo = await fetchMeetup(MEETUP_ID);
      return meetupInfo;
    },
    setMeetupInfo(info) {
      this.meetup = info;
    },
  },
};
