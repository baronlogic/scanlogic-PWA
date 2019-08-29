import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../../environments/environment';

const API_URL = environment.apiUrl;

const ENDPOINT_NAME = 'Projects';

const httpOptions = {
  headers: new HttpHeaders({
    'Token-App': '7875d82ca05f8ba818011eb04a890c20cb44c52e'
  })
}

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient) { }

  getAllProjectRecords(clientId: string){
    return this.http.get(API_URL+clientId+'-NONE-2-/'+ENDPOINT_NAME, httpOptions);
  }

  getProjectStatistics(clientId: string, projectId: string){
    return this.http.get(API_URL+clientId+'-'+projectId+'-2-/'+ENDPOINT_NAME+'/'+projectId+'/statistics', httpOptions);
  }


}
