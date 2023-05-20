import http from "../http-common";

class Bookservice {
  getAll() {
    return http.get("/book");
  }

  getbyid(id) {
    return http.get(`/book/${id}`);
  }

  getbyItemOrDdc(search) {
    return http.get(`/book/find/${search}`);
  }

  create(data) {
    return http.post("/book", data);
  }

  update(id, data) {
    return http.put(`/book/${id}`, data);
  }

  deleteById(id) {
    return http.delete(`/book/${id}`);
  }
}

export default new Bookservice();