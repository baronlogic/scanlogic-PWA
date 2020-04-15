import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { SearchComponent } from './search/search.component';
import { ParticipantDetailsComponent } from './participant-details/participant-details.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { ScanComponent } from './scan/scan.component';
import { SettingsComponent } from './settings/settings.component';

@NgModule({
  declarations: [PagesComponent, SearchComponent, ParticipantDetailsComponent, StatisticsComponent, ScanComponent, SettingsComponent],
  imports: [
    CommonModule,
    PagesRoutingModule,
    SharedModule
  ]
})
export class PagesModule { }
