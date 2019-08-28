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
    this.user = JSON.parse(localStorage.getItem('userLogged'));
    this.deviceForm = this.formBuilder.group({
      Device_Name: ['', Validators.required],
      User_Agent: [''],
      Ip_Address: [''],
    });
    this.getIP();
  }

  goToSearch(){
    this.router.navigate(['pages/search']);
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
        console.log(res);
        this.goToSearch();
      },
      err => {
        console.log(err);
      }
    );
  }

}
