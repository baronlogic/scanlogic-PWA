import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { PagesRoutingModule } from './pages-routing.module';
import { SearchComponent } from './search/search.component';

import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [SearchComponent],
  imports: [
    CommonModule,
    PagesRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class PagesModule { }
