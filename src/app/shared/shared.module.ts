import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//ANGULAR MATERIAL
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTableModule} from '@angular/material/table';
import {MatMenuModule} from '@angular/material/menu';
import {MatBadgeModule} from '@angular/material/badge';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatSelectModule} from '@angular/material/select';
import {MatListModule} from '@angular/material/list';
import {MatRippleModule} from '@angular/material/core';
import {MatCardModule} from '@angular/material/card';
import {MatTabsModule} from '@angular/material/tabs';

import { FlexLayoutModule } from "@angular/flex-layout";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatTableModule,
    MatMenuModule,
    MatBadgeModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressBarModule,
    MatListModule,
    MatRippleModule,
    MatCardModule,
    MatTabsModule,
    FlexLayoutModule
  ],
  exports: [
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatTableModule,
    MatMenuModule,
    MatBadgeModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressBarModule,
    MatListModule,
    MatRippleModule,
    MatCardModule,
    MatTabsModule,
    FlexLayoutModule
  ]
})
export class SharedModule { }
