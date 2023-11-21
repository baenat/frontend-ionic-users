import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

export interface User {
  id?: number;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  API = environment.userUrls;

  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http.get<User>(`${this.API.getUsers}`);
  }

  addUser(user: Partial<User>) {
    return this.http.post<User>(`${this.API.createUser}`, user);
  }

  updateUser(user: Partial<User>) {
    return this.http.put<User>(`${this.API.updateUser}/${user.id}`, user);
  }

  deleteUser(user: Partial<User>) {
    return this.http.delete(`${this.API.deleteUser}/${user.id}`);
  }

}
