import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from '../../../environments/environment';

const API_URL = environment.apiUrl;

const ENDPOINT_NAME = 'Participants';

const httpOptions = {
  headers: new HttpHeaders({
    'Token-App': '7875d82ca05f8ba818011eb04a890c20cb44c52e'
  })
}

@Injectable({
  providedIn: 'root'
})
export class ParticipantService {

  constructor(private http: HttpClient) { }

  GetAllParticipantRecords(clientId: string, projectId: string){
    return this.http.get(API_URL+clientId+'-'+projectId+'-2-/'+ENDPOINT_NAME, httpOptions);
  }

  searchForAParticipant(clientId: string, projectId: string, stringToSearch: any){
    return this.http.post(API_URL+clientId+'-'+projectId+'-2-/'+ENDPOINT_NAME+'/Search', stringToSearch, httpOptions);
  }

}
