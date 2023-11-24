import { Component, OnInit } from '@angular/core';
import { CommonRouteService } from 'src/app/service/common-route.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent implements OnInit {
  constructor(private commonRoute: CommonRouteService) {}

  ngOnInit(): void {}

  onRequest(email) {
    let payload = {
      email: email,
    };
    this.commonRoute.post('forgotpassword', payload).subscribe((res) => {
      sessionStorage.setItem('passToken', res.token);
    });
  }
}
