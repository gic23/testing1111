import http from "../http-common";

class LocationService {
  getAll() {
    return http.get("/location");
  }
  
  getByName(name) {
    return http.get(`/location/find/${name}`);
  }
} 

export default new LocationService();