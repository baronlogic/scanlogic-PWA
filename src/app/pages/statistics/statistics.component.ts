import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {

  statisticsForm: FormGroup;

  constructor(
    private router: Router,
    public snackBar: MatSnackBar,
    private formBuilder: FormBuilder
  )
  { }

  ngOnInit() {
    this.statisticsForm = this.formBuilder.group({
      email_this: ['']
    });
  }

  goToLogin() {
    this.router.navigate(['']);
  }

  goToSearch() {
    this.router.navigate(['pages/search']);
  }

  goToScan() {
    this.router.navigate(['pages/scan']);
  }

  goToSettings() {
    this.router.navigate(['settings']);
  }

}
