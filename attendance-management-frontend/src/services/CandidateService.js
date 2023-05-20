import http from "../http-common";

class StudentDataService {
  getAll() {
    return http.get("/candidate");
  }

  get(id) {
    return http.get(`/candidate/studentid/${id}`);
  } 

  create(data) {
    return http.post("/candidate", data);
  }

  update(id, data) {
    return http.put(`/candidate/${id}`, data);
  }

  deleteById(id) {
    return http.delete(`/candidate/${id}`);
  }
  
}

export default new StudentDataService();