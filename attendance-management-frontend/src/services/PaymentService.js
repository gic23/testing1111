import http from "../http-common";

class PaymentService {
  
  getByStudentId(id_student) {
    return http.get(`/payment/${id_student}`);
  }
  create(id_student) {
    return http.post(`/payment/${id_student}`);
  }
  update(id_student) {
    return http.put(`/payment/${id_student}`);
  }

}

export default new PaymentService();