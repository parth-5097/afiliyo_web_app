import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from '../../pages/admin/profile/profile.component';
import { RouterModule, Routes } from '@angular/router';
import { EditProfileComponent } from '../../pages/admin/edit-profile/edit-profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: ProfileComponent,
  },
  {
    path: 'edit',
    component: EditProfileComponent,
  },
];

@NgModule({
  declarations: [ProfileComponent, EditProfileComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class ProfileModule {}
