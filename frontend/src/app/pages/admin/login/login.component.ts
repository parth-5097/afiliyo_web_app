import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonRouteService } from 'src/app/service/common-route.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  keepMe: any;

  constructor(
    private formBuilder: FormBuilder,
    private commonService: CommonRouteService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/),
        ],
      ],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    } else {
      this.loginForm.value.fcmToken = 'desktop';
      this.commonService
        .post('login', this.loginForm.value)
        .subscribe((res) => {
          this.toastr.success('Logged In');
          sessionStorage.setItem('adminUser', JSON.stringify(res.data));
          this.keepMe == true
            ? localStorage.setItem('adminUser', JSON.stringify(res.data))
            : '';
          this.router.navigate(['admin/dashboard']);
        });
    }
  }
}
