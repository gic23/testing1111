
const attendanceRoute = [
  {
    path: '/attendance',
    name: 'Attendance',
    component: () => import('../views/attendance/Attendance.vue'),
    meta: {
      header: 1,
      auth: false
    }
  },
  {
    path: '/attendance/topten',
    name: 'Top Ten Register',
    component: () => import('../views/attendance/ToptenRegister.vue'),
    meta: {
      header: 1,
      auth: false
    }
  }
];

export default attendanceRoute;