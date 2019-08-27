import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-device-identifier',
  templateUrl: './device-identifier.component.html',
  styleUrls: ['./device-identifier.component.scss']
})
export class DeviceIdentifierComponent implements OnInit {

  user: any;

  deviceForm: FormGroup;
  DeviceName:string;

  constructor(
    private router: Router,
    public snackBar: MatSnackBar,
    private formBuilder: FormBuilder
  ) 
  { }

  ngOnInit() {
    this.deviceForm = this.formBuilder.group({
      Device_Name: ['', Validators.required]
    });
  }

  resetDeviceName(){
    this.deviceForm.reset();
  }

  handleDevice(){
    console.log(this.deviceForm.value);
  }

}
