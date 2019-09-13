import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from '../../../environments/environment';

const API_URL = environment.apiUrl;

const ENDPOINT_NAME = 'Activities';

const httpOptions = {
  headers: new HttpHeaders({
    'Token-App': '7875d82ca05f8ba818011eb04a890c20cb44c52e'
  })
}

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  constructor(private http: HttpClient) { }

  getActivities(clientId: string, projectId: string){
    return this.http.get(API_URL+clientId+'-'+projectId+'-2-/'+ENDPOINT_NAME, httpOptions).pipe(
      map(
        (resp: any) => { 
          let activities = resp.filter(value => value.Scan == 1);
          return activities;
        }
      )
    );
  }

}
