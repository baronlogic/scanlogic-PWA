import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { PagesRoutingModule } from './pages-routing.module';
import { SearchComponent } from './search/search.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { ScanComponent } from './scan/scan.component';
import { SettingsComponent } from './settings/settings.component';

import { SharedModule } from '../shared/shared.module';

import { ZXingScannerModule } from '@zxing/ngx-scanner';
@NgModule({
  declarations: [SearchComponent, StatisticsComponent, ScanComponent, SettingsComponent],
  imports: [
    CommonModule,
    PagesRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    ZXingScannerModule
  ]
})
export class PagesModule { }
