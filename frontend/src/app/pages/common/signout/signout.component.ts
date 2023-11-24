import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsernameService } from 'src/app/service/username.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-signout',
  templateUrl: './signout.component.html',
  styleUrls: ['./signout.component.css'],
})
export class SignoutComponent implements OnInit {
  constructor(
    private usernameService: UsernameService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.usernameService.get('signout').subscribe(
      (res) => {
        setTimeout(() => {
          localStorage.clear();
          sessionStorage.clear();
          this.router.navigate(['admin/signin']);
        }, environment.logout_time);
      },
      (err) => {
        alert(err.error.message);
      }
    );
  }
}
