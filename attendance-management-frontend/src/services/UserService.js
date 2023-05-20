import http from "../http-common";
import axios from "axios";

class UserService {

  login(data) {
    return http.post("/user/login", data);
  }
  getUser() {
    var token = sessionStorage.getItem("Token");

    return axios.get(`${process.env.VUE_APP_SERVICE_URL}/user`, { 'headers': { 'Authorization': token } });
  }

  update(id, data) {
    return http.put(`/user/${id}`, data);
  }
  
  delete(id) {
    return http.delete(`/user/${id}`);
  }

  register(data) {
    return http.post("/user/register", data);
  }
  change_password(data) {
    return http.put("/user/changepassword", data);
  }

}

export default new UserService();