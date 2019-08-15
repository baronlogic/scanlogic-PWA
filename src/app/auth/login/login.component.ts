import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';

import { MatSnackBar } from '@angular/material/snack-bar';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user: any;

  auxRes: any;

  signInForm: FormGroup;

  hidePassword = true;

  bSignIn = false;

  constructor(
    private router: Router,
    public snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.signInForm = this.formBuilder.group({
      Email: ['', Validators.required],
      Password: ['', Validators.required],
      Client_Id: ['', Validators.required]
    });
  }

  openSnackBar(message: string){
    this.snackBar.open(message, 'Close', {
      duration: 3000,
    });
  }

  handleSignIn(){
    this.bSignIn = true;
    let formData = new FormData();
    formData.append('email', this.signInForm.get('Email').value);
    formData.append('password', this.signInForm.get('Password').value);
    //console.log(this.signInForm.value);
    this.authService.validateUserCredentials(this.signInForm.get('Client_Id').value, formData)
    .subscribe(
      res => {
        this.bSignIn = false;
        console.log(res);
      },
      err => {
        this.bSignIn = false;
        console.log(err);
      }
    );
  }

}
