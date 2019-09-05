import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-repeat-scans',
  templateUrl: './repeat-scans.component.html',
  styleUrls: ['./repeat-scans.component.scss']
})
export class RepeatScansComponent implements OnInit {

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

  logout(){
    localStorage.clear();
    this.router.navigate(['']);
  }

  resetDeviceName(){
    this.modeForm.reset();
  }

  handleMode(){
    console.log(this.modeForm.value);
  }

}
