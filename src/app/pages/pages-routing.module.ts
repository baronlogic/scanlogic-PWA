import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { SearchComponent } from './search/search.component';
import { ParticipantDetailsComponent } from './participant-details/participant-details.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { ScanComponent } from './scan/scan.component';
import { SettingsComponent } from './settings/settings.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      { path: '', redirectTo: 'search', pathMatch: 'full' },
      { path: 'search', component: SearchComponent },
      { path: 'statistics', component: StatisticsComponent },
      { path: 'scan', component: ScanComponent },
      { path: 'settings', component: SettingsComponent },
    ]
  },
  { path: 'participant-details/:id', component: ParticipantDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
