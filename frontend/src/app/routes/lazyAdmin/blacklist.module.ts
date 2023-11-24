import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UserBlacklistComponent } from 'src/app/pages/admin/user-blacklist/user-blacklist.component';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: UserBlacklistComponent,
  },
];

@NgModule({
  declarations: [UserBlacklistComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule,
  ],
})
export class BlacklistModule {}
