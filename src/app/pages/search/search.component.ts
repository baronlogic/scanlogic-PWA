import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ParticipantsService } from 'src/app/core/services/participants.service';
import { StatisticsService } from 'src/app/core/services/statistics.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  user: any;
  userSettings: any;
  participants: any;
  filteredParticipants: any[] = [];
  projectScanStatistics: any;
  searchForm: FormGroup;

  _listFilter = '';

  get listFilter(): string {
    return this._listFilter;
  }

  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredParticipants = this.listFilter ? this.doFilter(this.listFilter) : this.participants;
  }

  doFilter(filterBy: string): any[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.participants.filter((participant: any) =>
    participant.First_Name.toLocaleLowerCase().indexOf(filterBy) !== -1 ||
    participant.Family_Name.toLocaleLowerCase().indexOf(filterBy) !== -1
    );
  }

  constructor(
    private router: Router,
    public snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private statisticsService: StatisticsService,
    private participantsService: ParticipantsService
  ) { }

  ngOnInit(): void {

    this.searchForm = this.formBuilder.group({
      Search_Term: ['']
    });

    this.user = JSON.parse(localStorage.getItem('userLogged'));

    this.userSettings = JSON.parse(localStorage.getItem('userSettings'));

    //This should be handled better, perhaps using localForage.
    if(!sessionStorage.getItem('participants')){
      this.getParticipants();
    }
    else if(sessionStorage.getItem('participants')){
      this.participants = JSON.parse(sessionStorage.getItem('participants'));
      this.filteredParticipants = this.participants;
      console.log(this.participants);
    }
    if(!sessionStorage.getItem('projectScanStatistics')){
      this.getProjectScanStatistics();
    }
    else if(sessionStorage.getItem('projectScanStatistics')){
      this.projectScanStatistics = JSON.parse(sessionStorage.getItem('projectScanStatistics'));
    }

  }

  openSnackBar(message: string){
    this.snackBar.open(message, 'Close', {
      duration: 3000,
    });
  }

  getParticipants(){
    this.participantsService.getParticipants(this.user.clientId, this.user.projectId)
    .subscribe(
      res => {
        this.participants = res;
        this.filteredParticipants = this.participants;
        sessionStorage.setItem('participants', JSON.stringify(this.participants));
        console.log(this.participants);
      },
      err => {
        console.log(err);
      }
    );
  }

  goToParticipantDetails(id){
    this.router.navigate(['pages/participant-details', id]);
  }

  getProjectScanStatistics(){
    this.statisticsService.getProjectScanStatistics(this.user.clientId, this.user.projectId)
    .subscribe(
      res => {
        this.projectScanStatistics = res;
        sessionStorage.setItem('projectScanStatistics', JSON.stringify(this.projectScanStatistics));
      },
      err => {
        console.log(err);
      }
    );
  }

  searchParticipant(){
    if(this.searchForm.get('Search_Term').value == ''){
      this.filteredParticipants = this.participants;
      console.log("si si probando")
    }
    let formData = new FormData();
    formData.append('Search_Term', this.searchForm.get('Search_Term').value);
    this.participantsService.searchParticipant(this.user.clientId, this.user.projectId, formData)
    .subscribe(
      res => {
        console.log(res);
      //this._listFilter = this.searchForm.get('Search_Term').value;
      //this.filteredParticipants = this.listFilter ? res : this.participants;
      },
      err => {
        console.log(err);
      }
    );
  }

}
