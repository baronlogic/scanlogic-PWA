import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  { path: 'auth', loadChildren: './auth/auth.module#AuthModule' },
  { path: 'project', loadChildren: './project/project.module#ProjectModule' },
  { path: 'settings', loadChildren: './settings/settings.module#SettingsModule' },
  { path: 'pages', loadChildren: './pages/pages.module#PagesModule' }  
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
