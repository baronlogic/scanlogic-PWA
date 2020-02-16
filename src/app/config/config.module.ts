import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ConfigRoutingModule } from './config-routing.module';
import { ProjectSelectionComponent } from './project-selection/project-selection.component';
import { SetupComponent } from './setup/setup.component';

@NgModule({
  declarations: [ProjectSelectionComponent, SetupComponent],
  imports: [
    CommonModule,
    ConfigRoutingModule,
    SharedModule
  ]
})
export class ConfigModule { }
