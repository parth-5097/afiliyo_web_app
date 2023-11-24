import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsComponent } from '../../pages/admin/reports/reports.component';
import { RouterModule, Routes } from '@angular/router';
import { DataTablesModule } from 'angular-datatables';
import { EditReportsComponent } from '../../pages/admin/edit-reports/edit-reports.component';

const routes: Routes = [
  {
    path: '',
    component: ReportsComponent,
  },
  {
    path: '',
    component: EditReportsComponent,
  },
];

@NgModule({
  declarations: [ReportsComponent, EditReportsComponent],
  imports: [CommonModule, RouterModule.forChild(routes), DataTablesModule],
})
export class ReportsModule {}
