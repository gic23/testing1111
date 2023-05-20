
const studentRoute = [
  {
    path: '/student',
    name: 'student',
    component: () => import('../views/candidate/Candidate.vue'),
    meta: {
      header: 1,
      auth: true
    }
  },
  {
    path: '/student/type',
    name: 'studenttype',
    component: () => import('../views/candidate/CandidateType.vue'),
    meta: {
      header: 1,
      auth: true
    }
  },
  {
    path: '/student/department',
    name: 'department',
    component: () => import('../views/candidate/Department.vue'),
    meta: {
      header: 1,
      auth: true
    }
  },
  {
    path: '/student/departmentoption',
    name: 'departmentoption',
    component: () => import('../views/candidate/DepartmentOption.vue'),
    meta: {
      header: 1,
      auth: true
    }
  },
  {
    path: '/student/candidatetype',
    name: 'candidatetype',
    component: () => import('../views/candidate/CandidateType.vue'),
    meta: {
      header: 1,
      auth: true
    }
  },
  {
    path: '/student/uploadexcel',
    name: 'Uploaddataexcel',
    component: () => import('../views/candidate/Uploaddataexcel.vue'),
    meta: {
      header: 1,
      auth: true
    }
  },
  {
    path: '/student/idcard',
    name: 'Chart',
    component: () => import('../views/Financial/StudentIDCard.vue'),
    meta: {
      header: 1,
      auth: false
    }
  },
];

export default studentRoute;