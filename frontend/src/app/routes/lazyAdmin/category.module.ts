import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from 'src/app/pages/admin/category/category.component';
import { DataTablesModule } from 'angular-datatables';

const routes: Routes = [
  {
    path: '',
    component: CategoryComponent,
  },
];

@NgModule({
  declarations: [CategoryComponent],
  imports: [CommonModule, RouterModule.forChild(routes), DataTablesModule],
})
export class CategoryModule {}
