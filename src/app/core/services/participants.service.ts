import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { ApiService } from './api.service';

const ENDPOINT_NAME = 'Participants';

@Injectable({
  providedIn: 'root'
})
export class ParticipantsService extends ApiService {

  getParticipants(clientId: string, projectId: string){
    return this.http.get(this.API_URL+clientId+'-'+projectId+'-2-/'+ENDPOINT_NAME, this.httpOptions).pipe(
      map(
        (resp: any) => { 
          let participants = resp.filter(value => value.Date_Registered != '');
          return participants;
        }
      )
    );
  }



}
