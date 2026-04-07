import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { adminGuard } from './core/guards/admin.guard';

import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { HotelListComponent } from './features/hotels/hotel-list/hotel-list.component';
import { HotelDetailComponent } from './features/hotels/hotel-detail/hotel-detail.component';
import { BookingFormComponent } from './features/bookings/booking-form/booking-form.component';
import { MyBookingsComponent } from './features/bookings/my-bookings/my-bookings.component';
import { DashboardComponent } from './features/admin/dashboard/dashboard.component';
import { ManageHotelsComponent } from './features/admin/manage-hotels/manage-hotels.component';
import { ManageBookingsComponent } from './features/admin/manage-bookings/manage-bookings.component';

const routes: Routes = [
  { path: '', redirectTo: '/hotels', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'hotels', component: HotelListComponent },
  { path: 'hotels/:id', component: HotelDetailComponent, canActivate: [authGuard] },
  { path: 'hotels/:id/book/:roomId', component: BookingFormComponent, canActivate: [authGuard] },
  { path: 'my-bookings', component: MyBookingsComponent, canActivate: [authGuard] },
  { path: 'admin', component: DashboardComponent, canActivate: [authGuard, adminGuard] },
  { path: 'admin/hotels', component: ManageHotelsComponent, canActivate: [authGuard, adminGuard] },
  { path: 'admin/bookings', component: ManageBookingsComponent, canActivate: [authGuard, adminGuard] },
  { path: '**', redirectTo: '/hotels' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}