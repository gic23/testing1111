
const Route = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
    meta: {
      header: 0,
      auth: true
    }
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue'),
    meta: {
      header: 1,
      auth: true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/auth/Login.vue'),
    meta: {
      header: 0,
      auth: true
    }
  },
  {
    path: '/user-manage',
    name: 'Usermanage',
    component: () => import('../views/auth/Usermanage.vue'),
    meta: {
      header: 1,
      auth: true
    }
  },
  {
    path: '/change-password',
    name: 'ChangePassword',
    component: () => import('../views/auth/Changepassword.vue'),
    meta: {
      header: 1,
      auth: true
    }
  },
  {
    path: '/dashboard',
    name: 'Admin',
    component: () => import('../views/Dashboard.vue'),
    meta: {
      header: 1,
      auth: false
    }
  },
  {
    path: '/test',
    name: 'Test',
    component: () => import('../views/Test'),
    meta: {
      header: 1,
      auth: true
    }
  },
  {
    path: '/permission',
    name: 'Permission',
    component: () => import('../views/auth/Permission.vue'),
    meta: {
      header: 1,
      auth: false
    }
  }
];

export default Route;