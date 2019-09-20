import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { DeviceService } from 'src/app/core/services/device.service';

@Component({
  selector: 'app-device-identifier',
  templateUrl: './device-identifier.component.html',
  styleUrls: ['./device-identifier.component.scss']
})
export class DeviceIdentifierComponent implements OnInit {

  user: any;
  ip: string;
  deviceForm: FormGroup;
  DeviceName:string;

  constructor(
    private router: Router,
    public snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private deviceService: DeviceService
  ) 
  { }

  ngOnInit() {
    if(localStorage.getItem('userLogged')){
      this.user = JSON.parse(localStorage.getItem('userLogged'));
      this.selectStep();
    }
    this.deviceForm = this.formBuilder.group({
      Device_Name: ['', Validators.required],
      User_Agent: [''],
      Ip_Address: [''],
    });
    this.getIP();
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

  getIP(){
    this.deviceService.getIP()
    .subscribe(
      res => {
        //console.log(res);
        this.ip = res;
      },
      err => {
        //console.log(err);
      }
    );
  }

  resetDeviceName(){
    this.deviceForm.reset();
  }

  handleDevice(){
    this.deviceForm.controls['User_Agent'].setValue(window.navigator.userAgent);
    this.deviceForm.controls['Ip_Address'].setValue(this.ip);
    //console.log(this.deviceForm.value);

    let formData = new FormData();
    formData.append('Device_Name', this.deviceForm.get('Device_Name').value);
    formData.append('User_Agent', this.deviceForm.get('User_Agent').value);
    formData.append('Ip_Address', this.deviceForm.get('Ip_Address').value);

    this.deviceService.registerDevice(this.user.clientId, this.user.projectId, formData)
    .subscribe(
      res => {
        //console.log(res);
        let auxRes:any = res;
        this.user.deviceId = auxRes.Device_Id;
        this.user.deviceName = this.deviceForm.get('Device_Name').value;
        //console.log(this.user);
        localStorage.setItem('userLogged', JSON.stringify(this.user));
        this.goToScannerMode();
      },
      err => {
        console.log(err);
      }
    );
  }

}
