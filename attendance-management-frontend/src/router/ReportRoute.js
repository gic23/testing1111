
const reportRoute = [
  {
    path: '/report/attendance',
    name: 'Attendace_report',
    component: () => import('../views/report/ReportAttendance.vue'),
    meta: {
      header: 1,
      auth: false
    }
  },
  {
    path: '/report/payment',
    name: 'Payment_report',
    component: () => import('../views/report/ReportPayment.vue'),
    meta: {
      header: 1,
      auth: false
    }
  },
];

export default reportRoute;