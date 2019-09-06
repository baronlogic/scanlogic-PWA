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
    {value: 0, viewValue: 'Access Control Mode'},
    {value: 1, viewValue: 'Access Tracking Mode'}
  ];

  user: any;
  modeForm: FormGroup;

  constructor(
    private router: Router,
    public snackBar: MatSnackBar,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('userLogged'));
    this.modeForm = this.formBuilder.group({
      Scanner_Mode: ['', Validators.required]
    });
  }

  goToDeviceName(){
    this.router.navigate(['settings/device']);
  }

  goToRepeatScans(){
    this.router.navigate(['settings/repeat']);
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['']);
  }

  resetDeviceName(){
    this.modeForm.reset();
  }

  handleMode(){
    //console.log(this.modeForm.value);
    this.user.scannerMode = this.modeForm.get('Scanner_Mode').value;
    //console.log(this.user);
    localStorage.setItem('userLogged', JSON.stringify(this.user));
    if(this.user.scannerMode == 0){
      this.goToRepeatScans();
    }
    else{
      console.log('PASO 5');
    }
    
  }

}
