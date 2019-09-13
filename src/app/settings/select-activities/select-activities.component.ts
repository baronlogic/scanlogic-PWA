import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ActivityService } from 'src/app/core/services/activity.service';

@Component({
  selector: 'app-select-activities',
  templateUrl: './select-activities.component.html',
  styleUrls: ['./select-activities.component.scss']
})
export class SelectActivitiesComponent implements OnInit {

  activities: any[];

  user: any;
  selectForm: FormGroup;

  constructor(
    private router: Router,
    public snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private activityService: ActivityService
  ) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('userLogged'));
    this.selectForm = this.formBuilder.group({
      Select_Activities: ['']
    });
    this.getActivities();
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

  resetSelect(){
    this.selectForm.reset();
  }

  handleResetButton(){
    if(this.selectForm.get('Select_Activities').value == '' || this.selectForm.get('Select_Activities').value == []){
      return true;
    }
    else{
      return false;
    }
  }

  getActivities(){
    this.activityService.getActivities(this.user.clientId, this.user.projectId)
    .subscribe(
      res => {
        console.log(res);
        this.activities = res;
      },
      err => {
        console.log(err);
      }
    );
  }


  handleSelect(){
    this.user.selectActivities = this.selectForm.get('Select_Activities').value;
    console.log(this.user);
    localStorage.setItem('userLogged', JSON.stringify(this.user));
    this.goToSearch();
  }

}
