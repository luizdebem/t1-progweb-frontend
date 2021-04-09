  
import axios from 'axios';
import { environment } from '../environments.js';

export class ApiService {
  uri = environment.URI_API;

  getUsers() {
    return axios.get(`${this.uri}/usuarios`);
  }

  postUser(user) {
    return axios.post(`${this.uri}/usuarios`, user);
  }

  deleteUserById(userId) {
    return axios.delete(`${this.uri}/usuarios/${userId}`);
  }

  updateUser(userInfo) {
    return axios.put(`${this.uri}/usuarios`, userInfo);
  }
}