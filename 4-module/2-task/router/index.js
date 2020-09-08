import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

export function scrollBehavior(to, from, savedPosition) {
  if (savedPosition) {
    return savedPosition;
  } else {
    if (to.hash) {
      return {
        selector: to.hash,
      };
    }
    let toSaveScrollPosition = false;
    let fromSaveScrollPosition = false;
    to.matched.forEach((record) => {
      if (record.meta.saveScrollPosition) {
        toSaveScrollPosition = true;
      }
    });
    from.matched.forEach((record) => {
      if (record.meta.saveScrollPosition) {
        fromSaveScrollPosition = true;
      }
    });
    if (toSaveScrollPosition && fromSaveScrollPosition) {
      return false;
    }
    return { x: 0, y: 0 };
  }
}

export const router = new VueRouter({
  mode: 'history',

  base: process.env.BASE_URL,

  scrollBehavior,

  routes: [
    {
      path: '/',
      name: 'index',
      // alias: 'meeetups'
      // redirect: '/meetups',
      component: () => import('../views/MeetupsPage'),
    },
    {
      path: '/meetups',
      name: 'meetups',
      component: () => import('../views/MeetupsPage'),
    },
    {
      path: '/meetups/:meetupId(\\d+)',
      name: 'meetup',
      redirect: (to) => ({ name: 'meetup-description', params: to.params }),
      meta: {
        showReturnToMeetups: true,
        saveScrollPosition: true,
      },
      component: () => import('../views/MeetupPage'),
      children: [
        {
          path: '',
          alias: 'description',
          name: 'meetup-description',
          props: true,
          component: () => import('../views/MeetupDescriptionPage'),
        },
        {
          path: 'agenda',
          name: 'meetup-agenda',
          props: true,
          component: () => import('../views/MeetupAgendaPage'),
        },
      ],
    },
  ],
});
