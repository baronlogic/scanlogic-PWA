import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { MatSnackBar } from '@angular/material/snack-bar';

import { ParticipantService } from 'src/app/core/services/participant.service';
import { ProjectService } from 'src/app/core/services/project.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  user: any;
  participants: any;
  statistics: any;

  searchForm: FormGroup;

  constructor(
    private router: Router,
    public snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private projectService: ProjectService,
    private participantService: ParticipantService
  ) { }

  ngOnInit() {
    if(!localStorage.getItem('userLogged')){
      this.goToLogin();
      return;
    }
    this.user = JSON.parse(localStorage.getItem('userLogged'));
    //console.log(this.user);
    this.getParticipants();
    this.getStatistics();
    this.searchForm = this.formBuilder.group({
      Search_Term: ['']
    });
  }

  openSnackBar(message: string){
    this.snackBar.open(message, 'Close', {
      duration: 3000,
    });
  }

  goToLogin() {
    this.router.navigate(['']);
  }

  getParticipants(){
    this.participantService.GetAllParticipantRecords(this.user.clientId, this.user.projectId)
    .subscribe(
      res => {
        //console.log(res);
        this.participants = res;
        console.log(this.participants);
      },
      err => {
        console.log(err);
      }
    );
  }

  searchParticipant(){
    //console.log(this.searchForm.get('Search_Term').value);
    if(this.searchForm.get('Search_Term').value == '' || this.searchForm.get('Search_Term').value == null){
      this.openSnackBar('Please fill in the search field');
      this.getParticipants();
      return;
    }

    let formData = new FormData();
    formData.append('Search_Term', this.searchForm.get('Search_Term').value);

    this.participantService.searchForAParticipant(this.user.clientId, this.user.projectId, formData)
    .subscribe(
      res => {
        //console.log(res);
        this.participants = res;
        this.searchForm.reset();
      },
      err => {
        //console.log(err);
        this.searchForm.reset();
      }
    );
  }

  getStatistics(){
    this.projectService.getProjectStatistics(this.user.clientId, this.user.projectId)
    .subscribe(
      res => {
        console.log(res);
        this.statistics = res;
      },
      err => {
        console.log(err);
      }
    );
  }

}
