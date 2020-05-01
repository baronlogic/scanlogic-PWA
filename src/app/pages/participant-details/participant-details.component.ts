import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ParticipantsService } from 'src/app/core/services/participants.service';

@Component({
  selector: 'app-participant-details',
  templateUrl: './participant-details.component.html',
  styleUrls: ['./participant-details.component.scss']
})
export class ParticipantDetailsComponent implements OnInit {

  id: number;
  private sub: any;
  user: any;
  participant: any;
  bParticipantDoesNotExist = false;

  constructor(
    
    private router: Router,
    private route: ActivatedRoute,
    private participantsService: ParticipantsService
  ) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('userLogged'));
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
      this.getParticipant(this.id);
    });
  }

  goToSearch(){
    this.router.navigate(['pages/search'], { replaceUrl: true });
  }

  getParticipant(id){
    this.participantsService.getParticipant(this.user.clientId, this.user.projectId, id)
    .subscribe(
      res => {
        this.participant = res;
      },
      err => {
        console.log(err);
      }
    );
  }

  checkIfParticipantExist(){
    if(this.participant){
      if(this.participant.length == 0){
        this.bParticipantDoesNotExist = true;
        return false
      }
      else{
        return true;
      }
    }
    else{
      return false;
    }
  }

}
