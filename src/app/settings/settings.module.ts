import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';

import { SettingsRoutingModule } from './settings-routing.module';
import { DeviceIdentifierComponent } from './device-identifier/device-identifier.component';

import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [DeviceIdentifierComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SettingsRoutingModule,
    SharedModule
  ]
})
export class SettingsModule { }
