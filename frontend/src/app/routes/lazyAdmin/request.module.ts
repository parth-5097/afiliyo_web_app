import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestComponent } from '../../pages/admin/request/request.component';
import { RouterModule, Routes } from '@angular/router';
import { DataTablesModule } from 'angular-datatables';

const routes: Routes = [
  {
    path: '',
    component: RequestComponent,
  },
];

@NgModule({
  declarations: [RequestComponent],
  imports: [CommonModule, RouterModule.forChild(routes), DataTablesModule],
})
export class RequestModule {}
