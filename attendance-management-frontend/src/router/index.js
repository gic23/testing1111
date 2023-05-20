import Vue from 'vue'
import VueRouter from 'vue-router'
import studentRoute from './StudentRoute'
import attendanceRoute from './AttendanceRoute'
import bookRoute from './BookRoute'
import reportRoute from './ReportRoute'
import chartRoute from './ChartRoute'
import Route from './Route'


Vue.use(VueRouter)

//auth=true (Can Access)
//auth=false (Cannot Access without authenticate)
var routes = [
];

studentRoute.forEach(item => {
  routes.push(item);
});
attendanceRoute.forEach(item => {
  routes.push(item);
});
bookRoute.forEach(item => {
  routes.push(item);
});
reportRoute.forEach(item => {
  routes.push(item);
});
chartRoute.forEach(item => {
  routes.push(item);
});
Route.forEach(item => {
  routes.push(item);
});

routes.push(
  {
    path: '/:catchAll(.*)*',
    name: "PageNotFound",
    component: () => import('../views/PageNotFound.vue'),

  }
);


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {

  console.log(to.meta.auth);
  var Token = sessionStorage.getItem('Token');

  if (to.meta.auth) {
    next();
  } else if (!to.meta.auth && Token == null) {
    next('/login');
  }
  else {
    next();
  }
});

export default router
