import { Component, OnInit } from '@angular/core';
import { UserDto } from '../../../core/models/user.model';
import { AuthService } from '../../../core/services/auth.service';

@Component({ selector: 'app-manage-users', templateUrl: './manage-users.component.html' })
export class ManageUsersComponent implements OnInit {
  users: UserDto[] = []; loading = true;
  filterRole = ''; filterVerified = '';

  constructor(private auth: AuthService) {}
  ngOnInit() { this.load(); }

  load() {
    this.loading = true;
    this.auth.getUsers().subscribe(u => { this.users = u; this.loading = false; });
  }

  get filtered() {
    return this.users.filter(u => {
      if (this.filterRole && u.role !== this.filterRole) return false;
      if (this.filterVerified === 'yes' && !u.isEmailVerified) return false;
      if (this.filterVerified === 'no' && u.isEmailVerified) return false;
      return true;
    });
  }

  toggle(id: number) { this.auth.toggleUser(id).subscribe(() => this.load()); }
  delete(id: number) { if (!confirm('Delete user?')) return; this.auth.deleteUser(id).subscribe(() => this.load()); }

  initials(name: string) { return name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || '?'; }
}