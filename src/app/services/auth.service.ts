import { Injectable } from '@angular/core';
import { Login } from '../interfaces/login.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private users = [
    { email: 'user@example.com', password: 'password' }
  ];
  private secretKey = 'SecretKey';

  constructor(
    private storage: Storage
  ){
    this.storage = window.localStorage;
  }

  // перевірка наявності користувача у списку користувачів
  public validateUser(loginData: Login): boolean {
    if(this.users.some(user => user.email === loginData.email && user.password === loginData.password)){
        const json = JSON.stringify(this.secretKey);
        const token = btoa(json);

        this.storage.setItem('token', token);
        return true;
    }
    return false;
  }

  public logout(): void {
    this.storage.removeItem('token');
  }
}