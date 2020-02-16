import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProjectsService } from 'src/app/core/services/projects.service';

@Component({
  selector: 'app-project-selection',
  templateUrl: './project-selection.component.html',
  styleUrls: ['./project-selection.component.scss']
})
export class ProjectSelectionComponent implements OnInit {

  user: any;
  projectsFiltered: any;
  projects: any;
  //This handles the mat-progress-bar
  bProjects = true;
  //This handles the error response when loading projects
  bError = false;

  constructor(
    private router: Router,
    public snackBar: MatSnackBar,
    private projectsService: ProjectsService
  ) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('userLogged'));
    this.getProjects(this.user.clientId);
  }

  openSnackBar(message: string){
    this.snackBar.open(message, 'Close', {
      duration: 3000,
    });
  }

  logout(){
    localStorage.clear();
    this.router.navigate([''], { replaceUrl: true });
  }

  goToSetup(){
    this.router.navigate(['config/setup']);
  }

  getProjects(clientId: string){
    this.projectsService.getAllProjectRecords(clientId)
    .subscribe(
      res => {
        this.projects = res;
        this.filterProjects(this.projects);
        this.bProjects = false;
      },
      err => {
        console.log(err);
        this.bError = true;
        this.bProjects = false;
        this.openSnackBar(err.message);
      }
    );
  }

  selectProject(project: any){
    this.user.projectId = project;
    localStorage.setItem('userLogged', JSON.stringify(this.user));
    this.goToSetup();
  }

  loadProjects(){
    this.bProjects = true;
    this.bError = false;
    this.getProjects(this.user.clientId);
  }

  filterProjects(projects){
    this.projectsFiltered = [];
    for(let i = 0; i < projects.length; i++){
      if(projects[i].Archive == 0){
        this.projectsFiltered.push(projects[i]);
      }
    }
  }

}
