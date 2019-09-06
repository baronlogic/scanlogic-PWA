import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DeviceIdentifierComponent } from './device-identifier/device-identifier.component';
import { ScannerModeComponent } from './scanner-mode/scanner-mode.component';
import { RepeatScansComponent } from './repeat-scans/repeat-scans.component';
import { ActivitySettingsComponent } from './activity-settings/activity-settings.component';
import { SelectActivitiesComponent } from './select-activities/select-activities.component';


const routes: Routes = [
  { path: 'device', component: DeviceIdentifierComponent },
  { path: 'scanner', component: ScannerModeComponent },
  { path: 'repeat', component: RepeatScansComponent },
  { path: 'activity', component: ActivitySettingsComponent },
  { path: 'select-activities', component: SelectActivitiesComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
