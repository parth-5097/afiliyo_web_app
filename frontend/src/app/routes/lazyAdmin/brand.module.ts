import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BrandComponent } from 'src/app/pages/admin/brand/brand.component';
import { DataTablesModule } from 'angular-datatables';

const routes: Routes = [
  {
    path: '',
    component: BrandComponent,
  },
];

@NgModule({
  declarations: [BrandComponent],
  imports: [CommonModule, RouterModule.forChild(routes), DataTablesModule],
})
export class BrandModule {}
