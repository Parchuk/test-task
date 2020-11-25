import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'ContactList',
    component: () => import('../views/ContactList'),
    meta: {
      title: 'Contact List'
    }
  },
  {
    path: '/contact-details/:id',
    name: 'ContactDetails',
    component: () => import('../views/ContactDetails'),
    meta: {
      title: 'Contact Details'
    }
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  next();
});
export default router;
