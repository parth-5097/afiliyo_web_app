import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTablesModule } from 'angular-datatables';
import { NgApexchartsModule } from 'ng-apexcharts';

import { AdminComponent } from '../../pages/admin/admin.component';
import { AdminHeaderComponent } from 'src/app/layouts/header/admin-header/admin-header.component';
import { AdminSideComponent } from 'src/app/layouts/sidebar/admin-side/admin-side.component';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../../pages/admin/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ForgotPasswordComponent } from '../../pages/admin/forgot-password/forgot-password.component';
import { DashboardComponent } from '../../pages/admin/dashboard/dashboard.component';
import { LogoutComponent } from '../../pages/admin/logout/logout.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
  },
  {
    path: 'logout',
    component: LogoutComponent,
  },
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('./profile.module')
            .then((m) => m.ProfileModule)
            .catch((err) => console.error(err)),
      },
      {
        path: 'users',
        loadChildren: () =>
          import('./users.module')
            .then((m) => m.UsersModule)
            .catch((err) => console.error(err)),
      },
      {
        path: 'blacklist',
        loadChildren: () =>
          import('./blacklist.module')
            .then((m) => m.BlacklistModule)
            .catch((err) => console.error(err)),
      },
      {
        path: 'category',
        loadChildren: () =>
          import('./category.module')
            .then((m) => m.CategoryModule)
            .catch((err) => console.error(err)),
      },
      {
        path: 'brand',
        loadChildren: () =>
          import('./brand.module')
            .then((m) => m.BrandModule)
            .catch((err) => console.error(err)),
      },
      {
        path: 'color',
        loadChildren: () =>
          import('./color.module')
            .then((m) => m.ColorModule)
            .catch((err) => console.error(err)),
      },
      {
        path: 'size',
        loadChildren: () =>
          import('./size.module')
            .then((m) => m.SizeModule)
            .catch((err) => console.error(err)),
      },
      {
        path: 'request',
        loadChildren: () =>
          import('./request.module')
            .then((m) => m.RequestModule)
            .catch((err) => console.error(err)),
      },
      {
        path: 'post',
        loadChildren: () =>
          import('./post.module')
            .then((m) => m.PostModule)
            .catch((err) => console.error(err)),
      },
      {
        path: 'item',
        loadChildren: () =>
          import('./items.module')
            .then((m) => m.ItemsModule)
            .catch((err) => console.error(err)),
      },
      {
        path: 'analytics',
        loadChildren: () =>
          import('./analytics.module')
            .then((m) => m.AnalyticsModule)
            .catch((err) => console.error(err)),
      },
      {
        path: 'report',
        loadChildren: () =>
          import('./reports.module')
            .then((m) => m.ReportsModule)
            .catch((err) => console.error(err)),
      },
    ],
  },
];

@NgModule({
  declarations: [
    AdminComponent,
    AdminHeaderComponent,
    AdminSideComponent,
    LoginComponent,
    ForgotPasswordComponent,
    DashboardComponent,
    LogoutComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    NgApexchartsModule,
    DataTablesModule,
  ],
})
export class AdminModule {}
