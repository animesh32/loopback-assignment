import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Configs } from '../enums/configs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  
  constructor(private http: HttpClient) {}
  loggedUser: string | null = null;
  isLoggedIn = (): boolean => {
    if(this.loggedUser==null){
      return false;
    }
    return true;
  }

  async logIn(user: { username: string; password: string }) {
    try {
      const token = await this.http.post<{
        token: string;
      }>(`${Configs.signIn}`, user).toPromise();
      this.saveToken(token);
      this.loggedUser = user.username;
      return null;
    } catch (err) {
      return err;
    }
  }

  saveToken(token: { token: string }) {
    localStorage.setItem(Configs.JWT_TOKEN, token.token);
    return true;
  }
  logout() {
    this.clearToken();
    this.loggedUser = null;
  }
  clearToken() {
    localStorage.removeItem(Configs.JWT_TOKEN);
  }
  get getToken(){
    return localStorage.getItem(Configs.JWT_TOKEN);
  }
}
