import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';

const API_URL = environment.apiUrl;

const ENDPOINT_NAME = 'Users';

const httpOptions = {
  headers: new HttpHeaders({
    'Token-App': '7875d82ca05f8ba818011eb04a890c20cb44c52e'
  })
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  validateUserCredentials(clientId: string, user: any){
    return this.http.post(API_URL+clientId+'-NONE-2-/'+ENDPOINT_NAME+'/login/', user, httpOptions);
  }

  validateUserWithoutClientId(user: any){
    return this.http.post(API_URL+'NONE-NONE-2-/User/login/', user, httpOptions);
  }

}
