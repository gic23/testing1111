
const bookRoute = [
  {
    path: '/book',
    name: 'Book',
    component: () => import('../views/book/Book.vue'),
    meta: {
      header: 1,
      auth: false
    }
  },
  {
    path: '/book/department',
    name: 'Bookdepartment',
    component: () => import('../views/book/DepartmentBook.vue'),
    meta: {
      header: 1,
      auth: false
    }
  },
  {
    path: '/book/location',
    name: 'BookLocation',
    component: () => import('../views/book/Location.vue'),
    meta: {
      header: 1,
      auth: false
    }
  },
  {
    path: '/book/chart',
    name: 'BookChart',
    component: () => import('../views/book/Bookchart.vue'),
    meta: {
      header: 1,
      auth: false
    }
  },
  {
    path: '/book/department/:id',
    name: 'Book_department_detail',
    component: () => import('../views/book/BookInDepartment.vue'),
    meta: {
      header: 1,
      auth: false
    }
  },
  {
    path: '/book/find',
    name: 'BookFind',
    component: () => import('../views/book/BookFind.vue'),
    meta: {
      header: 1,
      auth: false
    }
  }
];

export default bookRoute;