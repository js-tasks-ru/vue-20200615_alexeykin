import { agendaItemIcons, agendaItemTitles } from './data.js';

export const MeetupAgendaItem = {
  name: 'MeetupAgendaItem',

  template: `<div class="meetup-agenda__item">
      <div class="meetup-agenda__item-col">
        <img class="icon" alt="icon" :src="icon" />
      </div>
      <div class="meetup-agenda__item-col">{{ time }}</div>
      <div class="meetup-agenda__item-col">
        <h5 class="meetup-agenda__title">{{ title }}</h5>
        <p>
          <span v-if="agendaItem.speaker">{{ agendaItem.speaker }}</span>
          <span v-if="agendaItem.speaker" class="meetup-agenda__dot"></span>
          <span v-if="agendaItem.language" class="meetup-agenda__lang">{{ agendaItem.language }}</span>
        </p>
        <p v-if="agendaItem.description">{{ agendaItem.description }}</p>
      </div>
    </div>`,

  props: {
    agendaItem: {
      type: Object,
      required: true,
    },
  },

  computed: {
    icon() {
      return `/assets/icons/icon-${agendaItemIcons[this.agendaItem.type]}.svg`;
    },
    time() {
      return `${this.agendaItem.startsAt} - ${this.agendaItem.endsAt}`;
    },
    title() {
      const title =
        this.agendaItem.title || agendaItemTitles[this.agendaItem.type];
      return title;
    },
  },
};
