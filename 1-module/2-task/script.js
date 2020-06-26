import Vue from '/vendor/vue.esm.browser.js';

/** URL адрес API */
const API_URL = 'https://course-vue.javascript.ru/api';

/** ID митапа для примера; используйте его при получении митапа */
const MEETUP_ID = 6;

/**
 * Возвращает ссылку на изображение митапа для митапа
 * @param meetup - объект с описанием митапа (и параметром meetupId)
 * @return {string} - ссылка на изображение митапа
 */
function getMeetupCoverLink(meetup) {
  return `${API_URL}/images/${meetup.imageId}`;
}

/**
 * Словарь заголовков по умолчанию для всех типов элементов программы
 */
const agendaItemTitles = {
  registration: 'Регистрация',
  opening: 'Открытие',
  break: 'Перерыв',
  coffee: 'Coffee Break',
  closing: 'Закрытие',
  afterparty: 'Afterparty',
  talk: 'Доклад',
  other: 'Другое',
};

/**
 * Словарь иконок для всех типов элементов программы.
 * Соответствует имени иконок в директории /assets/icons
 */
const agendaItemIcons = {
  registration: 'key',
  opening: 'cal-sm',
  talk: 'tv',
  break: 'clock',
  coffee: 'coffee',
  closing: 'key',
  afterparty: 'cal-sm',
  other: 'cal-sm',
};

export const app = new Vue({
  el: '#app',

  data: {
    meetupData: {},
  },

  async mounted() {
    this.setMeetupInfo(await this.fetchData());
  },

  computed: {
    meetupImage() {
      return `${API_URL}/images/${this.meetupData.imageId}`;
    },
    localeDate() {
      return new Date(this.meetupData.date).toLocaleString('ru', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    },
    agendaIcons() {
      const iconsUrls = [];
      this.meetupData.agenda.forEach(
        (agenda) =>
          (iconsUrls[agenda.id] = `/assets/icons/icon-${
            agendaItemIcons[agenda.type]
          }.svg`),
      );
      return iconsUrls;
    },
    agendaTitles() {
      const iconsTitles = [];
      this.meetupData.agenda.forEach(
        (agenda) =>
          (iconsTitles[agenda.id] =
            agenda.title || agendaItemTitles[agenda.type]),
      );
      return iconsTitles;
    },
  },

  methods: {
    async fetchData() {
      const meetupInfo = await fetch(`${API_URL}/meetups/${MEETUP_ID}`);
      return meetupInfo.json();
    },
    setMeetupInfo(info) {
      this.meetupData = info;
    },
  },
});
