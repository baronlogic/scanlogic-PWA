import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { SearchComponent } from './search/search.component';
import { ParticipantDetailsComponent } from './participant-details/participant-details.component';

@NgModule({
  declarations: [PagesComponent, SearchComponent, ParticipantDetailsComponent],
  imports: [
    CommonModule,
    PagesRoutingModule,
    SharedModule
  ]
})
export class PagesModule { }
