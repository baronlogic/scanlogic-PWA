import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DevicesService } from 'src/app/core/services/devices.service';
import { ActivitiesService } from 'src/app/core/services/activities.service';

@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.scss']
})
export class SetupComponent implements OnInit {

  step = 0;
  setStep(index: number) {
    this.step = index;
  }
  nextStep() {
    this.step++;
  }
  prevStep() {
    if(this.step == 4 && this.userSettings.scannerMode == 'access_tracking_mode'){
      this.setStep(1);
    }
    else{
      this.step--;
    }
  }

  userSettings: any;

  user: any;

  //1) DEVICE NAME
  ip: string;
  deviceForm: FormGroup;
  DeviceName:string;
  allDevices: any;
  //2) SCANNER MODE
  scannerModes: any[] = [
    {value: 'access_control_mode', viewValue: 'Access Control Mode'},
    {value: 'access_tracking_mode', viewValue: 'Access Tracking Mode'}
  ];
  modeForm: FormGroup;
  //3) REPEAT SCANS
  RepeatModes: any[] = [
    {value: 'allow', viewValue: 'Allow repeat scans'},
    {value: 'do_not_allow', viewValue: 'Do not allow repeat scans'}
  ];
  repeatForm: FormGroup;
  //4) ACTIVITY SETTINGS
  activitySettingsModes: any[] = [
    {value: 'check_all', viewValue: 'Check has all Activities'},
    {value: 'check_single', viewValue: 'Check has atleast one Activity'}
  ];
  activitySettingsForm: FormGroup;
  //5) SELECT ACTIVITIES
  activities: any[] = [];
  selectActivitiesForm: FormGroup;

  constructor(
    private router: Router,
    public snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private devicesService: DevicesService,
    private activitiesService: ActivitiesService
  ) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('userLogged'));
    this.userSettings = {};
    //1) DEVICE NAME
    this.getDevices();
    this.deviceForm = this.formBuilder.group({
      Device_Name: ['', Validators.required],
      User_Agent: [''],
      Ip_Address: [''],
    });
    this.getIP();
    //2) SCANNER MODE
    this.modeForm = this.formBuilder.group({
      Scanner_Mode: ['', Validators.required]
    });
    //3) REPEAT SCANS
    this.repeatForm = this.formBuilder.group({
      Scanner_Repeat: ['', Validators.required]
    });
    //4) ACTIVITY SETTINGS
    this.activitySettingsForm = this.formBuilder.group({
      Activity_Settings: ['', Validators.required]
    });
    //5) SELECT ACTIVITIES
    this.selectActivitiesForm = this.formBuilder.group({
      Select_Activities: ['']
    });
    this.getActivities();
  }

  openSnackBar(message: string){
    this.snackBar.open(message, 'Close', {
      duration: 3000,
    });
  }

  logout(){
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigate([''], { replaceUrl: true });
  }

  changeProject(){
    delete this.user.projectId;
    localStorage.setItem('userLogged', JSON.stringify(this.user));
    this.router.navigate(['config/project-selection']);
  }

  getDevices(){
    this.devicesService.getDevices(this.user.clientId, this.user.projectId)
    .subscribe(
      res => {
        this.allDevices = res;
      },
      err => {
        console.log(err);
      }
    );
  }

  getIP(){
    this.devicesService.getIP()
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
    //We need to check if the Device_Name of the device we are going to register already exists. 
    //To avoid registering two devices with the same name. 
    //We will take the information of the device that already exists in that case.
    for(let i = this.allDevices.length-1; i >= 0; i--){
      if(this.deviceForm.get('Device_Name').value.toUpperCase() == this.allDevices[i].Device_Name.toUpperCase()){
        this.openSnackBar('Device previously registered!');
        this.userSettings.deviceId = this.allDevices[i].Device_Id;
        this.userSettings.deviceName = this.allDevices[i].Device_Name;
        localStorage.setItem('userSettings', JSON.stringify(this.userSettings));
        this.nextStep();
        return;
      }
    }

    this.openSnackBar('New Registered Device!');

    this.deviceForm.controls['User_Agent'].setValue(window.navigator.userAgent);
    this.deviceForm.controls['Ip_Address'].setValue(this.ip);

    let formData = new FormData();
    formData.append('Device_Name', this.deviceForm.get('Device_Name').value);
    formData.append('User_Agent', this.deviceForm.get('User_Agent').value);
    formData.append('Ip_Address', this.deviceForm.get('Ip_Address').value);

    this.devicesService.registerDevice(this.user.clientId, this.user.projectId, formData)
    .subscribe(
      res => {
        let auxRes:any = res;
        this.userSettings.deviceId = auxRes.Device_Id;
        this.userSettings.deviceName = this.deviceForm.get('Device_Name').value;
        localStorage.setItem('userSettings', JSON.stringify(this.userSettings));
        this.nextStep();
      },
      err => {
        console.log(err);
      }
    );
  }

  resetScannerMode(){
    this.modeForm.reset();
  }

  handleMode(){
    this.userSettings.scannerMode = this.modeForm.get('Scanner_Mode').value;
    localStorage.setItem('userSettings', JSON.stringify(this.userSettings));
    if(this.userSettings.scannerMode == 'access_control_mode'){
      this.nextStep();
    }
    else{
      this.setStep(4);
    }
  }

  resetRepeatScans(){
    this.repeatForm.reset();
  }

  handleRepeat(){
    this.userSettings.scannerRepeat = this.repeatForm.get('Scanner_Repeat').value;
    localStorage.setItem('userSettings', JSON.stringify(this.userSettings));
    this.nextStep();
  }

  resetActivitySettings(){
    this.activitySettingsForm.reset();
  }

  handleActivitySettings(){
    this.userSettings.activitySettings = this.activitySettingsForm.get('Activity_Settings').value;
    localStorage.setItem('userSettings', JSON.stringify(this.userSettings));
    this.nextStep();
  }

  resetSelect(){
    this.selectActivitiesForm.reset();
  }

  handleResetButton(){
    if(this.selectActivitiesForm.get('Select_Activities').value == '' || this.selectActivitiesForm.get('Select_Activities').value == []){
      return true;
    }
    else{
      return false;
    }
  }

  getActivities(){
    this.activitiesService.getActivities(this.user.clientId, this.user.projectId)
    .subscribe(
      res => {
        this.activities = res;
      },
      err => {
        console.log(err);
      }
    );
  }

  handleSelectActivities(){
    this.userSettings.selectActivities = this.selectActivitiesForm.get('Select_Activities').value;
    localStorage.setItem('userSettings', JSON.stringify(this.userSettings));
    this.goToPages();
  }

  goToPages(){
    this.router.navigate(['pages']);
  }

}
