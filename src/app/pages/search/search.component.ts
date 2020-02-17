import { Component, OnInit } from '@angular/core';
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
    private participantsService: ParticipantsService
  ) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('userLogged'));
    this.userSettings = JSON.parse(localStorage.getItem('userSettings'));
    this.getParticipants();
  }

  getParticipants(){
    this.participantsService.getParticipants(this.user.clientId, this.user.projectId)
    .subscribe(
      res => {
        console.log(res);
        this.participants = res;
      },
      err => {
        console.log(err);
      }
    );
  }

}
