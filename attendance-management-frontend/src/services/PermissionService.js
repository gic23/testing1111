import http from "../http-common";

class PermissionService {
  
  getJsonFile() {
    return http.get(`/auth`);
  }
  update(data) {
    return http.put(`/auth`,data);
  }

}

export default new PermissionService();