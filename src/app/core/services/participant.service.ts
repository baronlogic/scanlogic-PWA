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

  GetAllParticipantRecords(clientId: string, ProjectId: string){
    return this.http.get(API_URL+clientId+'-'+ProjectId+'-2-/'+ENDPOINT_NAME, httpOptions);
  }

  searchForAParticipant(clientId: string, ProjectId: string, stringToSearch: any){
    return this.http.post(API_URL+clientId+'-'+ProjectId+'-2-/'+ENDPOINT_NAME+'/Search', stringToSearch, httpOptions);
  }

}
