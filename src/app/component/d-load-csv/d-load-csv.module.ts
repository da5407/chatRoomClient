import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DLoadCSVRoutingModule } from './d-load-csv-routing.module';
import { LoadpageComponent } from './loadpage/loadpage.component';


@NgModule({
  declarations: [LoadpageComponent],
  imports: [
    CommonModule,
    DLoadCSVRoutingModule
  ]
})
export class DLoadCSVModule { }
