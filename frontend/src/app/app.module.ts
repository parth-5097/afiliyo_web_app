import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { AdminRouteService } from './service/admin-route.service';
import { UserRouteService } from './service/user-route.service';
import { CommonRouteService } from './service/common-route.service';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { UsernameService } from './service/username.service';
import { HttperrorInterceptor } from './routes/interceptor/httperror.interceptor';
import { HomeComponent } from './pages/common/home/home.component';
import { AfilioHeaderComponent } from './layouts/header/afilio-header/afilio-header.component';
import { AfilioSidebarComponent } from './layouts/sidebar/afilio-sidebar/afilio-sidebar.component';
import { AfilioApplyFooterComponent } from './layouts/footer/afilio-apply-footer/afilio-apply-footer.component';
import { AfilioApplyHeaderComponent } from './layouts/header/afilio-apply-header/afilio-apply-header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NotFoundComponent } from './pages/common/not-found/not-found.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderFooterLayoutComponent } from './layouts/header-footer-layout/header-footer-layout.component';
import { CarConFooterComponent } from './layouts/footer/car-con-footer/car-con-footer.component';
import { CarConHFLayoutComponent } from './layouts/car-con-hf-layout/car-con-hf-layout.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AfilioHeaderComponent,
    AfilioSidebarComponent,
    AfilioApplyFooterComponent,
    AfilioApplyHeaderComponent,
    NotFoundComponent,
    HeaderFooterLayoutComponent,
    CarConFooterComponent,
    CarConHFLayoutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FormsModule,
    ToastrModule.forRoot(),
  ],
  providers: [
    AdminRouteService,
    UserRouteService,
    CommonRouteService,
    UsernameService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttperrorInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
