import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectRoutingModule } from './project-routing.module';
import { ProjectSelectionComponent } from './project-selection/project-selection.component';


@NgModule({
  declarations: [ProjectSelectionComponent],
  imports: [
    CommonModule,
    ProjectRoutingModule
  ]
})
export class ProjectModule { }
