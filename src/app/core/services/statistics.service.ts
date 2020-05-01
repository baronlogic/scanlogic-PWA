import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService extends ApiService {

  getProjectScanStatistics(clientId: string, projectId: string){
    return this.http.get(this.API_URL+clientId+'-'+projectId+'-2-/'+'ProjectScanStatistics', this.httpOptions);
  }

  getProjectScanDistinctStatistics(clientId: string, projectId: string){
    return this.http.get(this.API_URL+clientId+'-'+projectId+'-2-/'+'ProjectScanDistinctStatistics', this.httpOptions);
  }

  getDeviceScanDistinctStatistics(clientId: string, projectId: string){
    return this.http.get(this.API_URL+clientId+'-'+projectId+'-2-/'+'DeviceScanDistinctStatistics', this.httpOptions);
  }
  
}
