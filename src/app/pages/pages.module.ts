import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { SearchComponent } from './search/search.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { ScanComponent } from './scan/scan.component';
import { SettingsComponent } from './settings/settings.component';

import { SharedModule } from '../shared/shared.module';

import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { PagesComponent } from './pages.component';
@NgModule({
  declarations: [SearchComponent, StatisticsComponent, ScanComponent, SettingsComponent, PagesComponent],
  imports: [
    CommonModule,
    PagesRoutingModule,
    SharedModule,
    ZXingScannerModule
  ]
})
export class PagesModule { }
