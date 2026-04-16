import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { adminGuard } from './core/guards/admin.guard';

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

const routes: Routes = [
  { path: '', redirectTo: '/hotels', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'verify-email', component: VerifyEmailComponent },
  { path: 'hotels', component: HotelListComponent },
  { path: 'hotels/:id', component: HotelDetailComponent, canActivate: [authGuard] },
  { path: 'hotels/:id/book/:roomId', component: BookingFormComponent, canActivate: [authGuard] },
  { path: 'my-bookings', component: MyBookingsComponent, canActivate: [authGuard] },
  {
    path: 'admin', component: AdminShellComponent,
    canActivate: [authGuard, adminGuard],
    children: [
      { path: '', component: DashboardComponent },
      { path: 'hotels', component: ManageHotelsComponent },
      { path: 'rooms', component: ManageRoomsComponent },
      { path: 'bookings', component: ManageBookingsComponent },
      { path: 'users', component: ManageUsersComponent }
    ]
  },
  { path: '**', redirectTo: '/hotels' }
];

@NgModule({ imports: [RouterModule.forRoot(routes)], exports: [RouterModule] })
export class AppRoutingModule {}