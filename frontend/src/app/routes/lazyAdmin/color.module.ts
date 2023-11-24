import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ColorComponent } from 'src/app/pages/admin/color/color.component';
import { DataTablesModule } from 'angular-datatables';

const routes: Routes = [
  {
    path: '',
    component: ColorComponent,
  },
];

@NgModule({
  declarations: [ColorComponent],
  imports: [CommonModule, RouterModule.forChild(routes), DataTablesModule],
})
export class ColorModule {}
