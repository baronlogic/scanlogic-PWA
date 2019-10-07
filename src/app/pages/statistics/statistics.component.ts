import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { MatSnackBar } from '@angular/material/snack-bar';

import { DeviceService } from 'src/app/core/services/device.service';
import { ProjectService } from 'src/app/core/services/project.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {

  displayedColumns: string[] = ['Activity', 'Arrived', 'Not Scanned Total'];

  panelOpenState = false;

  user: any;
  stats: any;
  activityBreakdown: any;
  categoryBreakdown: any;
  statisticsForm: FormGroup;

  constructor(
    private router: Router,
    public snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private deviceService: DeviceService,
    private projectService: ProjectService
  )
  { }

  ngOnInit() {
    if(!localStorage.getItem('userLogged')){
      this.goToLogin();
      return;
    }
    this.user = JSON.parse(localStorage.getItem('userLogged'));
    this.statisticsForm = this.formBuilder.group({
      email_this: ['']
    });
    this.getProjectScanStatistics();
    this.getDeviceScanDistinctStatistics();
    this.getProjectScanDistinctStatistics();
  }

  goToLogin() {
    this.router.navigate(['']);
  }

  goToSearch() {
    this.router.navigate(['pages/search']);
  }

  goToScan() {
    this.router.navigate(['pages/scan']);
  }

  goToSettings() {
    this.router.navigate(['pages/settings']);
  }

  calculatePercentScanned(){
    return (100 * this.stats.Total_Scanned_In / this.stats.Total_Participants).toFixed(2);
  }

  getProjectScanStatistics(){
    this.projectService.getProjectScanStatistics(this.user.clientId, this.user.projectId)
    .subscribe(
      res => {
        console.log(res);
        this.stats = res;
      },
      err => {
        console.log(err);
      }
    );
  }

  getDeviceScanDistinctStatistics(){
    this.deviceService.getDeviceScanDistinctStatistics(this.user.clientId, this.user.projectId)
    .subscribe(
      res => {
        //console.log(res);
        this.activityBreakdown = res;
        console.log(this.activityBreakdown);
      },
      err => {
        console.log(err);
      }
    );
  }

  getProjectScanDistinctStatistics(){
    this.projectService.getProjectScanDistinctStatistics(this.user.clientId, this.user.projectId)
    .subscribe(
      res => {
        //console.log(res);
        let aux: any = res;
        this.categoryBreakdown = aux.days;
        console.log(this.categoryBreakdown);
      },
      err => {
        console.log(err);
      }
    );
  }

}
