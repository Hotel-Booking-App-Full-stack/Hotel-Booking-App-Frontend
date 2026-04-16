import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { JwtInterceptor } from './core/interceptors/jwt.interceptor';

import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { SessionTimerComponent } from './shared/session-timer/session-timer.component';

import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { VerifyEmailComponent } from './features/auth/verify-email/verify-email.component';
import { HotelListComponent } from './features/hotels/hotel-list/hotel-list.component';
import { HotelDetailComponent } from './features/hotels/hotel-detail/hotel-detail.component';
import { BookingFormComponent } from './features/bookings/booking-form/booking-form.component';
import { MyBookingsComponent } from './features/bookings/my-bookings/my-bookings.component';
import { AdminShellComponent } from './features/admin/admin-shell/admin-shell.component';
import { DashboardComponent } from './features/admin/dashboard/dashboard.component';
import { ManageHotelsComponent } from './features/admin/manage-hotels/manage-hotels.component';
import { ManageRoomsComponent } from './features/admin/manage-rooms/manage-rooms.component';
import { ManageBookingsComponent } from './features/admin/manage-bookings/manage-bookings.component';
import { ManageUsersComponent } from './features/admin/manage-users/manage-users.component';

@NgModule({
  declarations: [
    AppComponent, NavbarComponent, FooterComponent, SessionTimerComponent,
    LoginComponent, RegisterComponent, VerifyEmailComponent,
    HotelListComponent, HotelDetailComponent,
    BookingFormComponent, MyBookingsComponent,
    AdminShellComponent, DashboardComponent, ManageHotelsComponent,
    ManageRoomsComponent, ManageBookingsComponent, ManageUsersComponent
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, ReactiveFormsModule, HttpClientModule],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule {}