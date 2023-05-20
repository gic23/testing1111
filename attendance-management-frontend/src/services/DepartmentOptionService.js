import http from "../http-common";

class DepartmentOptionService {
  getAll() {
    return http.get("/departmentoption");
  }

  getbyid(id) {
    return http.get(`/departmentoption/${id}`);
  }

  getByName(name) {
    return http.get(`/departmentoption/find/${name}`);
  }


  create(data) {
    return http.post("/departmentoption", data);
  }

  update(id, data) {
    return http.put(`/departmentoption/${id}`, data);
  }

  deleteById(id) {
    return http.delete(`/departmentoption/${id}`);
  }

}

export default new DepartmentOptionService();