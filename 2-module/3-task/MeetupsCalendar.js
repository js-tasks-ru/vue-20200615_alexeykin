/* определение количества дней в месяце */
export function getDaysCounts(date) {
  const years = date.getFullYear();
  const months = date.getMonth();
  const counts = 32 - new Date(years, months, 32).getDate();
  return counts;
}

/* фильтрация митапов по переданному дню */
export function filterMeetups(date, meetups) {
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  const filteredMeetups = meetups.filter((meetup) => {
    const handledDate = new Date(meetup.date);
    const meetupDateYears = handledDate.getFullYear();
    const meetupDateMonths = handledDate.getMonth();
    const meetupDateDay = handledDate.getDate();
    return (
      meetupDateYears === year &&
      meetupDateMonths === month &&
      meetupDateDay === day
    );
  });
  return filteredMeetups;
}

export const MeetupsCalendar = {
  name: 'MeetupsCalendar',

  template: `<div class="rangepicker">
    <div class="rangepicker__calendar">
      <div class="rangepicker__month-indicator">
        <div class="rangepicker__selector-controls">
          <button class="rangepicker__selector-control-left" @click="onPrevMounth()"></button>
          <div>{{ localeDate }}</div>
          <button class="rangepicker__selector-control-right" @click="onNextMounth()"></button>
        </div>
      </div>
      <div class="rangepicker__date-grid">
        <div v-for="day in daysArray" class="rangepicker__cell" :class="{ rangepicker__cell_inactive: !day.active}">
          {{ day.day }}
          <template v-if="day.meetups.length">
            <a v-for="meetup in day.meetups" class="rangepicker__event">{{ meetup.title }}</a>
          </template>
        </div>
      </div>
    </div>
  </div>`,

  props: {
    meetups: {
      type: Array,
      required: true,
    },
  },

  /* В качестве локального состояния требуется хранить что-то,
   что позволит определить текущий показывающийся месяц.
   Изначально должен показываться текущий месяц */
  data() {
    return {
      date: new Date(),
    };
  },

  /* Вычислимые свойства помогут как с получением списка дней, так и с выводом информации */
  computed: {
    localeDate() {
      return this.date.toLocaleString(navigator.language, {
        year: 'numeric',
        month: 'long',
      });
    },
    /* список всех дней, которые выводятся на страницу */
    daysArray() {
      let arrayOfDays = [];
      const years = this.date.getFullYear();
      const months = this.date.getMonth();
      /* день недели, на который выпадает первое число текущего месяца */
      const firstWeekDay = new Date(years, months, 1).getDay();
      /* количество дней в текущем месяце */
      const currentMonthDaysCount = getDaysCounts(new Date(years, months));
      /* день недели, на который выпадает последнее число текущего месяца */
      const lastWeekDay = new Date(
        years,
        months,
        currentMonthDaysCount,
      ).getDay();
      for (let i = 1; i <= currentMonthDaysCount; i++) {
        const fullDate = new Date(years, months, i);
        const filteredMeetups = filterMeetups(fullDate, this.meetups);
        arrayOfDays.push({
          fullDate,
          day: fullDate.getDate(),
          active: true,
          meetups: filteredMeetups,
        });
      }
      /* если первый день месяца не приходится на понедельник */
      if (firstWeekDay !== 1) {
        /* количество дней в предыдущем месяце */
        const previousMonthDaysCount = getDaysCounts(
          new Date(years, months - 1),
        );
        const arrayOfPreviousMonthDays = [];
        if (firstWeekDay === 0) {
          for (
            let i = previousMonthDaysCount - 4;
            i <= previousMonthDaysCount;
            i++
          ) {
            const fullDate = new Date(years, months - 1, i);
            const filteredMeetups = filterMeetups(fullDate, this.meetups);
            arrayOfPreviousMonthDays.push({
              fullDate,
              day: fullDate.getDate(),
              active: false,
              meetups: filteredMeetups,
            });
          }
        } else {
          for (
            let i = previousMonthDaysCount - firstWeekDay + 2;
            i <= previousMonthDaysCount;
            i++
          ) {
            const fullDate = new Date(years, months - 1, i);
            const filteredMeetups = filterMeetups(fullDate, this.meetups);
            arrayOfPreviousMonthDays.push({
              fullDate,
              day: fullDate.getDate(),
              active: false,
              meetups: filteredMeetups,
            });
          }
        }
        arrayOfDays = arrayOfPreviousMonthDays.concat(arrayOfDays);
      }
      /* если последний день месяца не приходится на воскресенье */
      if (lastWeekDay !== 0) {
        const arrayOfNextMonthDays = [];
        for (let i = 1; i <= 7 - lastWeekDay; i++) {
          const fullDate = new Date(years, months + 1, i);
          const filteredMeetups = filterMeetups(fullDate, this.meetups);
          arrayOfNextMonthDays.push({
            fullDate,
            day: fullDate.getDate(),
            active: false,
            meetups: filteredMeetups,
          });
        }
        arrayOfDays = arrayOfDays.concat(arrayOfNextMonthDays);
      }
      return arrayOfDays;
    },
  },

  /* Методы понадобятся для переключения между месяцами */
  methods: {
    onPrevMounth() {
      const years = this.date.getFullYear();
      const months = this.date.getMonth();
      this.date = new Date(years, months - 1);
    },
    onNextMounth() {
      const years = this.date.getFullYear();
      const months = this.date.getMonth();
      this.date = new Date(years, months + 1);
    },
  },
};
