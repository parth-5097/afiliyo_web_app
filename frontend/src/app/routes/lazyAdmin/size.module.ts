import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SizeComponent } from 'src/app/pages/admin/size/size.component';
import { DataTablesModule } from 'angular-datatables';

const routes: Routes = [
  {
    path: '',
    component: SizeComponent,
  },
];

@NgModule({
  declarations: [SizeComponent],
  imports: [CommonModule, RouterModule.forChild(routes), DataTablesModule],
})
export class SizeModule {}
