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
    if(!localStorage.getItem('userLogged')){
      this.goToLogin();
      return;
    }
    this.user = JSON.parse(localStorage.getItem('userLogged'));
    //console.log(this.user);
    this.getProjects(this.user.clientId);
  }

  openSnackBar(message: string){
    this.snackBar.open(message, 'Close', {
      duration: 3000,
    });
  }

  goToLogin() {
    this.router.navigate(['']);
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['']);
  }

  goToDeviceName(){
    this.router.navigate(['settings/device']);
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
