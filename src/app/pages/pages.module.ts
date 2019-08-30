import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { PagesRoutingModule } from './pages-routing.module';
import { SearchComponent } from './search/search.component';
import { StatisticsComponent } from './statistics/statistics.component';

import { SharedModule } from '../shared/shared.module';
import { ScanComponent } from './scan/scan.component';


@NgModule({
  declarations: [SearchComponent, StatisticsComponent, ScanComponent],
  imports: [
    CommonModule,
    PagesRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class PagesModule { }
