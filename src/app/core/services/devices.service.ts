import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { ApiService } from './api.service';

const ENDPOINT_NAME = 'Devices';

@Injectable({
  providedIn: 'root'
})
export class DevicesService extends ApiService {

  getDevices(clientId: string, projectId: string){
    return this.http.get(this.API_URL+clientId+'-'+projectId+'-2-/'+ENDPOINT_NAME, this.httpOptions);
  }

  registerDevice(clientId: string, projectId: string, device: any){
    return this.http.post(this.API_URL+clientId+'-'+projectId+'-2-/'+ENDPOINT_NAME, device, this.httpOptions);
  }

  getIP(){
    return this.http.get('https://jsonip.com').pipe(
      map(
        (resp: any) => {
          return resp.ip;
        }
      )
    )
  }

}
