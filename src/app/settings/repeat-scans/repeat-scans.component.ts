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
    {value: 0, viewValue: 'Allow repeat scans'},
    {value: 1, viewValue: 'Do not allow repeat scans'}
  ];

  user: any;
  repeatForm: FormGroup;

  constructor(
    private router: Router,
    public snackBar: MatSnackBar,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('userLogged'));
    this.repeatForm = this.formBuilder.group({
      Scanner_Repeat: ['', Validators.required]
    });
  }

  goToScannerMode(){
    this.router.navigate(['settings/scanner']);
  }

  goToActivitySettings(){
    this.router.navigate(['settings/activity']);
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['']);
  }

  resetDeviceName(){
    this.repeatForm.reset();
  }

  handleRepeat(){
    //console.log(this.repeatForm.value);
    this.user.scannerRepeat = this.repeatForm.get('Scanner_Repeat').value;
    //console.log(this.user);
    localStorage.setItem('userLogged', JSON.stringify(this.user));
    this.goToActivitySettings();
  }

}
