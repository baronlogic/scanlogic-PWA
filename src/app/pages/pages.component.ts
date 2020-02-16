import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {

  user: any;
  userSettings: any;

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('userLogged'));
    this.userSettings = JSON.parse(localStorage.getItem('userSettings'));
  }

  changeProject(){
    delete this.user.projectId;
    localStorage.setItem('userLogged', JSON.stringify(this.user));
    this.router.navigate(['config/project-selection'], { replaceUrl: true });
  }

  changeSetup(){
    delete this.userSettings;
    localStorage.removeItem('userSettings');
    this.router.navigate(['config/setup'], { replaceUrl: true });
  }

  logout(){
    localStorage.clear();
    this.router.navigate([''], { replaceUrl: true });
  }

}
