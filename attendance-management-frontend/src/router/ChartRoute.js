
const chartRoute = [
  {
    path: '/chart/attendance',
    name: 'Attendace_chart',
    component: () => import('../views/attendance/Chart.vue'),
    meta: {
      header: 1,
      auth: false
    }
  },
  {
    path: '/chart/book',
    name: 'Book_chart',
    component: () => import('../views/book/Bookchart.vue'),
    meta: {
      header: 1,
      auth: false
    }
  }
];

export default chartRoute;