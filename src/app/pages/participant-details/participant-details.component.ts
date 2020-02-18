import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ParticipantsService } from 'src/app/core/services/participants.service';

@Component({
  selector: 'app-participant-details',
  templateUrl: './participant-details.component.html',
  styleUrls: ['./participant-details.component.scss']
})
export class ParticipantDetailsComponent implements OnInit {

  constructor(
    private router: Router,
    private participantsService: ParticipantsService
  ) { }

  ngOnInit(): void {
  }

  goToSearch(){
    this.router.navigate(['pages/search'], { replaceUrl: true });
  }

}
