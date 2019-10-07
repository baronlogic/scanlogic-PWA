import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchComponent } from './search/search.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { ScanComponent } from './scan/scan.component';
import { SettingsComponent } from './settings/settings.component';


const routes: Routes = [
  { path: 'search', component: SearchComponent },
  { path: 'statistics', component: StatisticsComponent },
  { path: 'scan', component: ScanComponent },
  { path: 'settings', component: SettingsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
