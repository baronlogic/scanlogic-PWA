import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-scanner-mode',
  templateUrl: './scanner-mode.component.html',
  styleUrls: ['./scanner-mode.component.scss']
})
export class ScannerModeComponent implements OnInit {

  modes: any[] = [
    {value: 'access_control_mode', viewValue: 'Access Control Mode'},
    {value: 'access_tracking_mode', viewValue: 'Access Tracking Mode'}
  ];

  user: any;
  modeForm: FormGroup;

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
    this.modeForm = this.formBuilder.group({
      Scanner_Mode: ['', Validators.required]
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

  resetScannerMode(){
    this.modeForm.reset();
  }

  handleMode(){
    //console.log(this.modeForm.value);
    this.user.scannerMode = this.modeForm.get('Scanner_Mode').value;
    //console.log(this.user);
    localStorage.setItem('userLogged', JSON.stringify(this.user));
    if(this.user.scannerMode == 'access_control_mode'){
      this.goToRepeatScans();
    }
    else{
      this.goToSelectActivities();
    }
    
  }

}
