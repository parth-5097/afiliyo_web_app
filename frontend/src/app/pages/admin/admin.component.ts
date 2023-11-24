import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {
    const sessionUser = sessionStorage.getItem('adminUser');
    const localUser = localStorage.getItem('adminUser');

    if (
      !window.location.pathname.match('/register') &&
      !window.location.pathname.match('/forgotpass') &&
      !window.location.pathname.match('/setpassword') &&
      !window.location.pathname.match('/login')
    ) {
      if ((localUser && sessionUser) || sessionUser) {
        this.router.navigate([`${window.location.pathname}`]);
      } else if (localUser) {
        sessionStorage.setItem('adminUser', localUser);
        this.router.navigate([`${window.location.pathname}`]);
      } else {
        this.router.navigate(['admin/login']);
      }
    }
  }
}
