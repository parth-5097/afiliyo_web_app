import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PostsComponent } from '../../pages/admin/posts/posts.component';
import { DataTablesModule } from 'angular-datatables';
import { ViewPerticularPostComponent } from 'src/app/pages/admin/view-perticular-post/view-perticular-post.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { EditPostComponent } from '../../pages/admin/edit-post/edit-post.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: PostsComponent,
  },
  {
    path: 'edit/:id',
    pathMatch: 'full',
    component: EditPostComponent,
  },
  {
    path: 'view',
    component: ViewPerticularPostComponent,
  },
];

@NgModule({
  declarations: [
    PostsComponent,
    ViewPerticularPostComponent,
    EditPostComponent,
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
export class PostModule {}
