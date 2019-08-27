import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectRoutingModule } from './project-routing.module';
import { ProjectSelectionComponent } from './project-selection/project-selection.component';

import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [ProjectSelectionComponent],
  imports: [
    CommonModule,
    ProjectRoutingModule,
    SharedModule
  ]
})
export class ProjectModule { }
