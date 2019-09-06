import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';

import { SettingsRoutingModule } from './settings-routing.module';
import { DeviceIdentifierComponent } from './device-identifier/device-identifier.component';
import { ScannerModeComponent } from './scanner-mode/scanner-mode.component';
import { RepeatScansComponent } from './repeat-scans/repeat-scans.component';
import { ActivitySettingsComponent } from './activity-settings/activity-settings.component';
import { SelectActivitiesComponent } from './select-activities/select-activities.component';

import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    DeviceIdentifierComponent,
    ScannerModeComponent,
    RepeatScansComponent,
    ActivitySettingsComponent,
    SelectActivitiesComponent
  ],
  
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SettingsRoutingModule,
    SharedModule
  ]
})
export class SettingsModule { }
