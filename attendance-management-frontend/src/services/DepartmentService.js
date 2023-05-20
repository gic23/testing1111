import http from "../http-common";

class DepartmentService {
  getAll() {
    return http.get("/department");
  }

  getById(id) {
    return http.get(`/department/${id}`);
  }
  
  getByName(name) {
    return http.get(`/department/find/${name}`);
  }

  create(data) {
    return http.post("/department", data);
  }

  update(id, data) {
    return http.put(`/department/${id}`, data);
  }

  deleteById(id) {
    return http.delete(`/department/${id}`);
  }

}

export default new DepartmentService();