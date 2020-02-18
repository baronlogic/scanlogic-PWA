import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ParticipantsService } from 'src/app/core/services/participants.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  user: any;
  userSettings: any;
  participants: any;

  constructor(
    private router: Router,
    private participantsService: ParticipantsService
  ) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('userLogged'));
    this.userSettings = JSON.parse(localStorage.getItem('userSettings'));
    //This should be handled better, perhaps using localForage.
    if(!sessionStorage.getItem('participants')){
      this.getParticipants();
    }
    else if(sessionStorage.getItem('participants')){
      this.participants = JSON.parse(sessionStorage.getItem('participants'));
    }
  }

  getParticipants(){
    this.participantsService.getParticipants(this.user.clientId, this.user.projectId)
    .subscribe(
      res => {
        this.participants = res;
        sessionStorage.setItem('participants', JSON.stringify(this.participants));
      },
      err => {
        console.log(err);
      }
    );
  }

  goToParticipantDetails(id){
    this.router.navigate(['pages/participant-details', id]);
  }

}
