import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-activity-settings',
  templateUrl: './activity-settings.component.html',
  styleUrls: ['./activity-settings.component.scss']
})
export class ActivitySettingsComponent implements OnInit {

  modes: any[] = [
    {value: 'check_all', viewValue: 'Check has all Activities'},
    {value: 'check_single', viewValue: 'Check has atleast one Activity'}
  ];

  user: any;
  activityForm: FormGroup;

  constructor(
    private router: Router,
    public snackBar: MatSnackBar,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    if(localStorage.getItem('userLogged')){
      this.user = JSON.parse(localStorage.getItem('userLogged'));
      this.selectStep();
    }
    this.activityForm = this.formBuilder.group({
      Activity_Settings: ['', Validators.required]
    });
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

  resetActivitySettings(){
    this.activityForm.reset();
  }

  handleActivity(){
    //console.log(this.repeatForm.value);
    this.user.activitySettings = this.activityForm.get('Activity_Settings').value;
    //console.log(this.user);
    localStorage.setItem('userLogged', JSON.stringify(this.user));
    this.goToSelectActivities();
  }

}
