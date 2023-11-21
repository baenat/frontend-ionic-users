import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  getToken() {
    return sessionStorage.getItem('token');
  }

  setToken(token: string) {
    sessionStorage.setItem('token', token);
  }

  removeToken() {
    sessionStorage.removeItem('token');
  }

}
