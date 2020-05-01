import { Component, OnInit } from '@angular/core';
import { StatisticsService } from 'src/app/core/services/statistics.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {

  user: any;
  userSettings: any;
  projectScanDistinctStatistics: any;
  deviceScanDistinctStatistics: any;

  constructor(
    private statisticsService: StatisticsService
  ) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('userLogged'));
    //This should be handled better, perhaps using localForage.
    if(!sessionStorage.getItem('projectScanDistinctStatistics')){
      this.getProjectScanDistinctStatistics();
    }
    else if(sessionStorage.getItem('projectScanDistinctStatistics')){
      this.projectScanDistinctStatistics = JSON.parse(sessionStorage.getItem('projectScanDistinctStatistics'));
    }
    if(!sessionStorage.getItem('deviceScanDistinctStatistics')){
      this.getDeviceScanDistinctStatistics();
    }
    else if(sessionStorage.getItem('deviceScanDistinctStatistics')){
      this.deviceScanDistinctStatistics = JSON.parse(sessionStorage.getItem('deviceScanDistinctStatistics'));
      console.log(this.deviceScanDistinctStatistics)
    }
  }

  getProjectScanDistinctStatistics(){
    this.statisticsService.getProjectScanDistinctStatistics(this.user.clientId, this.user.projectId)
    .subscribe(
      res => {
        console.log(res);
        this.projectScanDistinctStatistics = res;
        sessionStorage.setItem('projectScanDistinctStatistics', JSON.stringify(this.projectScanDistinctStatistics));
      },
      err => {
        console.log(err);
      }
    );
  }

  getDeviceScanDistinctStatistics(){
    this.statisticsService.getDeviceScanDistinctStatistics(this.user.clientId, this.user.projectId)
    .subscribe(
      res => {
        console.log(res);
        this.deviceScanDistinctStatistics = Object.values(res);
        sessionStorage.setItem('deviceScanDistinctStatistics', JSON.stringify(this.deviceScanDistinctStatistics));
      },
      err => {
        console.log(err);
      }
    );
  }

}
