import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonRouteService } from 'src/app/service/common-route.service';

@Component({
  selector: 'app-verifypassword',
  templateUrl: './verifypassword.component.html',
  styleUrls: ['./verifypassword.component.css'],
})
export class VerifypasswordComponent implements OnInit {
  token: any;

  constructor(
    private commonService: CommonRouteService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.token = params['token'];
    });
  }

  onRequest(newPw, confPw) {
    if (newPw !== confPw) {
      alert("Password doesn't match");
    } else {
      let payload = {
        newPassword: newPw,
        confirmPassword: confPw,
      };
      this.commonService
        .postPass(`verifypassword?token=${this.token}`, payload)
        .subscribe((res) => {
          console.log(res);
          this.router.navigate(['admin/signin']);
        });
    }
  }
}
