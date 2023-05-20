import http from "../http-common";

class CandidatetypeService {
  getAll() {
    return http.get("/candidatetype");
  }

  getbyid(id) {
    return http.get(`/candidatetype/${id}`);
  }

  create(data) {
    return http.post("/candidatetype", data);
  }

  update(id, data) {
    return http.put(`/candidatetype/${id}`, data);
  }

  deleteById(id) {
    return http.delete(`/candidatetype/${id}`);
  }

}

export default new CandidatetypeService();