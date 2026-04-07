import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { HotelListComponent } from './features/hotels/hotel-list/hotel-list.component';
import { HotelDetailComponent } from './features/hotels/hotel-detail/hotel-detail.component';
import { BookingFormComponent } from './features/bookings/booking-form/booking-form.component';
import { MyBookingsComponent } from './features/bookings/my-bookings/my-bookings.component';
import { DashboardComponent } from './features/admin/dashboard/dashboard.component';
import { ManageHotelsComponent } from './features/admin/manage-hotels/manage-hotels.component';
import { ManageBookingsComponent } from './features/admin/manage-bookings/manage-bookings.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { SessionTimerComponent } from './shared/session-timer/session-timer.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HotelListComponent,
    HotelDetailComponent,
    BookingFormComponent,
    MyBookingsComponent,
    DashboardComponent,
    ManageHotelsComponent,
    ManageBookingsComponent,
    NavbarComponent,
    FooterComponent,
    SessionTimerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
