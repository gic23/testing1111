import http from "../http-common";

class BookDepService {

  getBookByDepartmentId(id) {
    return http.get(`/bookdepartment/${id}`);
  }

  getBookNotInDepartmentId(id) {
    return http.get(`/bookdepartment/new/${id}`);
  }

  addBookToDepartment(data) {
    return http.post("/bookdepartment", data);
  }

  deleteBookToDepartment(data) {
    return http.post("/bookdepartment/remove", data);
  }

}

export default new BookDepService();