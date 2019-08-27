import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../../environments/environment';

const API_URL = environment.apiUrl;

const ENDPOINT_NAME = 'Devices';

const httpOptions = {
  headers: new HttpHeaders({
    'Token-App': '7875d82ca05f8ba818011eb04a890c20cb44c52e'
  })
}

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  constructor(private http: HttpClient) { }

  registerDevice(clientId: string, ProjectId: string, device: any){
    return this.http.post(API_URL+clientId+'-'+ProjectId+'-2-/'+ENDPOINT_NAME, device, httpOptions);
  }

  getAllDevices(clientId: string, ProjectId: string){
    return this.http.get(API_URL+clientId+'-'+ProjectId+'-2-/'+ENDPOINT_NAME, httpOptions);
  }
}
