import DashboardLayout from '../layout/DashboardLayout.vue'
// GeneralViews
import NotFound from '../pages/NotFoundPage.vue'
import Router from 'vue-router';
import Vue from 'vue';
// Admin pages
import UserProfile from 'src/pages/UserProfile/UserProfile.vue'
import Notifications from 'src/pages/Notifications.vue'
import Dashboard from "src/pages/Dashboard";
import Register from "../pages/Auth/Register";
import Login from "../pages/Auth/Login";
import RegisterConfirm from "../pages/Auth/RegisterConfirm";
import Search from "../pages/Search";

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/dashboard',
      component: DashboardLayout,
      redirect: '/dashboard/main',
      children: [
        {
          path: 'main',
          name: 'Main',
          component: Dashboard,
          meta: { requiresAuth: true },
        },
        {
          path: 'user',
          name: 'User',
          component: UserProfile,
          meta: { requiresAuth: true },
        },
        {
          path: 'notifications',
          name: 'Notifications',
          component: Notifications,
          meta: { requiresAuth: true },
        },
        {
          path: 'search',
          name: 'Search',
          component: Search,
          meta: { requiresAuth: true },
        },
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Registrations',
      component: Register,
    },
    {
      path: '/register/confirm/:hash',
      name: 'Confirm',
      component: RegisterConfirm
    },
    {path: '*', component: NotFound}
  ],
  linkActiveClass: 'nav-item active',
  mode: 'history',
  scrollBehavior: (to) => {
    if (to.hash) {
      return {selector: to.hash}
    } else {
      return { x: 0, y: 0 }
    }
  }
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    (localStorage.getItem('token')) ?  next() : next('/login');
  } else {
    next()
  }
});

export default router;
