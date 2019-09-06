import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-select-activities',
  templateUrl: './select-activities.component.html',
  styleUrls: ['./select-activities.component.scss']
})
export class SelectActivitiesComponent implements OnInit {

  modes: any[] = [
    {value: 0, viewValue: 'Check has all Activities'},
    {value: 1, viewValue: 'Check has atleast one Activity'}
  ];

  user: any;
  activityForm: FormGroup;

  constructor(
    private router: Router,
    public snackBar: MatSnackBar,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('userLogged'));
    this.activityForm = this.formBuilder.group({
      Activity_Settings: ['', Validators.required]
    });
  }

  goToActivitySettings(){
    this.router.navigate(['settings/activity']);
  }

  goToSearch(){
    this.router.navigate(['pages/search']);
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['']);
  }

  resetDeviceName(){
    this.activityForm.reset();
  }

  handleActivity(){
    //console.log(this.repeatForm.value);
    //this.user.activitySettings = this.activityForm.get('Activity_Settings').value;
    //console.log(this.user);
    //localStorage.setItem('userLogged', JSON.stringify(this.user));
    this.goToSearch();

  }

}
