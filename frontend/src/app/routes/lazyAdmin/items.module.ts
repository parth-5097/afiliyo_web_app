import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DataTablesModule } from 'angular-datatables';
import { ItemsComponent } from '../../pages/admin/items/items.component';
import { EditItemsComponent } from '../../pages/admin/edit-items/edit-items.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { ViewPerticularItemComponent } from '../../pages/admin/view-perticular-item/view-perticular-item.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: ItemsComponent,
  },
  {
    path: 'edit',
    component: EditItemsComponent,
  },
  {
    path: 'view',
    component: ViewPerticularItemComponent,
  },
];

@NgModule({
  declarations: [
    ItemsComponent,
    EditItemsComponent,
    ViewPerticularItemComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule,
    SlickCarouselModule,
  ],
})
export class ItemsModule {}
