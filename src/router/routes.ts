import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/administration',
    component: () => import('layouts/MainLayout.vue'),
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('pages/IndexPage.vue'),
      },
      {
        path: 'gestion-du-personnel',
        name: 'staff',
        component: () => import('pages/StaffManagement.vue'),
      },
      {
        path: 'gestion-des-demandes',
        name: 'requests',
        component: () => import('pages/RequestsManagement.vue'),
      },
      {
        path: 'gestion-des-notes-des-frais-de-mission',
        name: 'expenseReport',
        component: () => import('pages/ExpenseReportManagement.vue'),
      },
    ],
  },

  {
    path: '/app',
    component: () => import('layouts/UserLayout.vue'),
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        name: 'userHome',
        component: () => import('pages/app/AppHome.vue'),
      },
      {
        path: 'demandes-administrative',
        name: 'sendRequests',
        component: () => import('pages/app/AdministrativeRequests.vue'),
      },
    ],
  },

  {
    path: '/signIn',
    component: () => import('layouts/LoginLayout.vue'),
    meta: { visitor: true },
    children: [
      {
        path: '',
        name: 'login',
        component: () => import('pages/Login.vue'),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
