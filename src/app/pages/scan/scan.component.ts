import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-scan',
  templateUrl: './scan.component.html',
  styleUrls: ['./scan.component.scss']
})
export class ScanComponent implements OnInit {

  //
  availableDevices: MediaDeviceInfo[];
  //
  currentDevice: MediaDeviceInfo = null;
  //
  hasDevices: boolean;

  //THIS IS TO GO FROM THE VIEW OF RECENTS SCANS TO THE CAMERA
  bCam = false;
  //THIS IS TO HIDE THE SCANNER WHILE SCANNING
  scannerEnabled = true;
  //THIS IS TO SHOW THE PROGRESS BAR WHILE SCANNING
  bLoading = false;
  //THIS IS TO SHOW THE PERSON ID
  bPersonId = false;
  personId: string;

  auxDevice: any;

  scanForm: FormGroup;
  

  constructor(
    private router: Router,
    public snackBar: MatSnackBar,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.scanForm = this.formBuilder.group({
      email_this: ['']
    });
  }

  openSnackBar(message: string){
    this.snackBar.open(message, 'Close', {
      duration: 3000,
    });
  }

  goToLogin() {
    this.router.navigate(['']);
  }

  goToSearch() {
    this.router.navigate(['pages/search']);
  }

  goToStatistics() {
    this.router.navigate(['pages/statistics']);
  }

  goToSettings() {
    this.router.navigate(['settings']);
  }

  handleCamera(){
    this.bCam = !this.bCam;
    console.log(this.bCam);
  }

  reloadScanner(){
    this.scannerEnabled = true;
    this.bPersonId = false;
    this.currentDevice = this.auxDevice;
  }

  onCamerasFound(devices: MediaDeviceInfo[]): void {
    this.availableDevices = devices;
    this.hasDevices = Boolean(devices && devices.length);
  }

  onDeviceSelectChange(selected: string) {
    const device = this.availableDevices.find(x => x.deviceId === selected);
    this.currentDevice = device || null;
  }

  scanSuccessHandler($event){
    //console.log($event);
    this.auxDevice = this.currentDevice;
    this.bLoading = true;
    this.scannerEnabled = false;
    let isnum = /^\d+$/.test($event);
    if($event.split(' ').length != 1 || !isnum || $event.length != 7){
      this.openSnackBar("The scanned code does not contain a person id!");
      this.bLoading = false;
      return;
    }
    else{
      this.personId = $event;
      this.bPersonId = true;
      //this.getUserData(this.user.clientId, this.user.projectId, this.personId);
    }
  }

}
