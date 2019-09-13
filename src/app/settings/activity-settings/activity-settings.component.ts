import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-activity-settings',
  templateUrl: './activity-settings.component.html',
  styleUrls: ['./activity-settings.component.scss']
})
export class ActivitySettingsComponent implements OnInit {

  modes: any[] = [
    {value: 'check_all', viewValue: 'Check has all Activities'},
    {value: 'check_single', viewValue: 'Check has atleast one Activity'}
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

  goToRepeatScans(){
    this.router.navigate(['settings/repeat']);
  }

  goToSelectActivities(){
    this.router.navigate(['settings/select-activities']);
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['']);
  }

  resetActivitySettings(){
    this.activityForm.reset();
  }

  handleActivity(){
    //console.log(this.repeatForm.value);
    this.user.activitySettings = this.activityForm.get('Activity_Settings').value;
    //console.log(this.user);
    localStorage.setItem('userLogged', JSON.stringify(this.user));
    this.goToSelectActivities();
  }

}
