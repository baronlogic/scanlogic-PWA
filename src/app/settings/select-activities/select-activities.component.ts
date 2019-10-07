import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ActivityService } from 'src/app/core/services/activity.service';

@Component({
  selector: 'app-select-activities',
  templateUrl: './select-activities.component.html',
  styleUrls: ['./select-activities.component.scss']
})
export class SelectActivitiesComponent implements OnInit {

  activities: any[];

  user: any;
  selectForm: FormGroup;

  constructor(
    private router: Router,
    public snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private activityService: ActivityService
  ) { }

  ngOnInit() {
    if(localStorage.getItem('userLogged')){
      this.user = JSON.parse(localStorage.getItem('userLogged'));
      this.selectStep();
    }
    this.selectForm = this.formBuilder.group({
      Select_Activities: ['']
    });
    this.getActivities();
  }

  selectStep(){
    if(!this.user.id && !this.user.clientId){
      this.goToLogin();
      return;
    }
    else if(!this.user.projectId){
      this.goToProjectSelection();
      return;
    }
    else if(!this.user.deviceId && !this.user.deviceName){
      this.goToDeviceName();
      return;
    }
    else if(!this.user.scannerMode){
      this.goToScannerMode();
      return;
    }
    else if(!this.user.scannerRepeat){
      this.goToRepeatScans();
      return;
    }
    else if(!this.user.activitySettings){
      this.goToActivitySettings();
      return;
    }
    else if(!this.user.selectActivities){
      this.goToSelectActivities();
      return;
    }
  }

  goToSearch(){
    this.router.navigate(['pages/search']);
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['']);
  }

  goToLogin(){
    this.router.navigate(['']);
  }

  goToProjectSelection(){
    this.router.navigate(['/project']);
  }

  goToDeviceName(){
    this.router.navigate(['settings/device']);
  }

  goToScannerMode(){
    this.router.navigate(['settings/scanner']);
  }

  goToRepeatScans(){
    this.router.navigate(['settings/repeat']);
  }

  goToActivitySettings(){
    this.router.navigate(['settings/activity']);
  }

  goToSelectActivities(){
    this.router.navigate(['settings/select-activities']);
  }

  resetSelect(){
    this.selectForm.reset();
  }

  handleResetButton(){
    if(this.selectForm.get('Select_Activities').value == '' || this.selectForm.get('Select_Activities').value == []){
      return true;
    }
    else{
      return false;
    }
  }

  getActivities(){
    this.activityService.getActivities(this.user.clientId, this.user.projectId)
    .subscribe(
      res => {
        console.log(res);
        this.activities = res;
      },
      err => {
        console.log(err);
      }
    );
  }


  handleSelect(){
    this.user.selectActivities = this.selectForm.get('Select_Activities').value;
    console.log(this.user);
    localStorage.setItem('userLogged', JSON.stringify(this.user));
    this.goToSearch();
  }

}
