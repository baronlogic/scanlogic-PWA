import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

const ENDPOINT_NAME = 'Projects';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService extends ApiService  {

  getAllProjectRecords(clientId: string){
    return this.http.get(this.API_URL+clientId+'-NONE-2-/'+ENDPOINT_NAME, this.httpOptions);
  }
  
}
