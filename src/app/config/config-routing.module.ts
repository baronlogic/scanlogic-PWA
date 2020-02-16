import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjectSelectionComponent } from './project-selection/project-selection.component';
import { SetupComponent } from './setup/setup.component';

const routes: Routes = [
  { path: '', redirectTo: 'project-selection', pathMatch: "full" },
  { path: 'project-selection', component: ProjectSelectionComponent },
  { path: 'setup', component: SetupComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfigRoutingModule { }
