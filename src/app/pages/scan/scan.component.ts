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

}
