import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { ApiService } from './api.service';

const ENDPOINT_NAME = 'Activities';

@Injectable({
  providedIn: 'root'
})
export class ActivitiesService extends ApiService {

  getActivities(clientId: string, projectId: string){
    return this.http.get(this.API_URL+clientId+'-'+projectId+'-2-/'+ENDPOINT_NAME, this.httpOptions).pipe(
      map(
        (resp: any) => { 
          let activities = resp.filter(value => value.Scan == 1);
          return activities;
        }
      )
    );
  }

}
