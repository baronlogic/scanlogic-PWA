import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MatSnackBar } from '@angular/material/snack-bar';

import { ProjectService } from 'src/app/core/services/project.service';

@Component({
  selector: 'app-project-selection',
  templateUrl: './project-selection.component.html',
  styleUrls: ['./project-selection.component.scss']
})
export class ProjectSelectionComponent implements OnInit {

  user: any;
  projects: any;

  constructor(
    private router: Router,
    public snackBar: MatSnackBar,
    private projectService: ProjectService
  ) { }

  ngOnInit() {
    if(localStorage.getItem('userLogged')){
      this.user = JSON.parse(localStorage.getItem('userLogged'));
      this.selectStep();
    }
    //console.log(this.user);
    this.getProjects(this.user.clientId);
  }

  openSnackBar(message: string){
    this.snackBar.open(message, 'Close', {
      duration: 3000,
    });
  }

  selectStep(){
    if(!this.user.id && !this.user.clientId){
      this.goToLogin();
      return;
    }
    else if(!this.user.projectId){
      this.goToProjectSelection();
      return;
    }
    else if(!this.user.deviceId && !this.user.deviceName){
      this.goToDeviceName();
      return;
    }
    else if(!this.user.scannerMode){
      this.goToScannerMode();
      return;
    }
    else if(!this.user.scannerRepeat){
      this.goToRepeatScans();
      return;
    }
    else if(!this.user.activitySettings){
      this.goToActivitySettings();
      return;
    }
    else if(!this.user.selectActivities){
      this.goToSelectActivities();
      return;
    }
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['']);
  }

  goToLogin(){
    this.router.navigate(['']);
  }

  goToProjectSelection(){
    this.router.navigate(['/project']);
  }

  goToDeviceName(){
    this.router.navigate(['settings/device']);
  }

  goToScannerMode(){
    this.router.navigate(['settings/scanner']);
  }

  goToRepeatScans(){
    this.router.navigate(['settings/repeat']);
  }

  goToActivitySettings(){
    this.router.navigate(['settings/activity']);
  }

  goToSelectActivities(){
    this.router.navigate(['settings/select-activities']);
  }

  getProjects(clientId: string){
    this.projectService.getAllProjectRecords(clientId)
    .subscribe(
      res => {
        this.projects = res;
        console.log(this.projects);
      },
      err => {
        console.log(err);
        this.openSnackBar(err.message);
      }
    );
  }

  selectProject(project: any){
    this.user.projectId = project;
    localStorage.setItem('userLogged', JSON.stringify(this.user));
    this.goToDeviceName();
  }

}
