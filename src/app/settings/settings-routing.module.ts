import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DeviceIdentifierComponent } from './device-identifier/device-identifier.component';


const routes: Routes = [
  { path: 'device', component: DeviceIdentifierComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
