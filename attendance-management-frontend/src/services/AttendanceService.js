import http from "../http-common";

class AttendanceService {
  getLastAttendance() {
    return http.get("/attendance/lastfive");
  }
  getcountattendance() {
    return http.get("/attendance/count");
  }
  getTopRegisterAttendance() {
    return http.get("/attendance/top?length=10");
  }
  create(data) {
    return http.post("/attendance", data);
  }

} 

export default new AttendanceService();