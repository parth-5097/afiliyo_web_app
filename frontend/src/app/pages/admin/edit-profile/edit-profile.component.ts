import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MustMatch } from 'src/app/handler/custom_validator';
import { UsernameService } from 'src/app/service/username.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css'],
})
export class EditProfileComponent implements OnInit {
  editForm: FormGroup;
  changeForm: FormGroup;
  submitted = false;
  changeSubmit = false;
  data: any;
  readonly baseUrl = environment.PORT_URL;

  constructor(
    private usernameService: UsernameService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.changeForm = this.formBuilder.group(
      {
        oldpassword: ['', Validators.required],
        newpassword: ['', Validators.required],
        confirmpassword: ['', Validators.required],
      },
      {
        validator: MustMatch('newpassword', 'confirmpassword'),
      }
    );

    this.editForm = this.formBuilder.group({
      name: [''],
      username: [''],
      bio: [''],
      sh_website: [''],
      sh_instagram: [''],
      sh_facebook: [''],
      sh_tiktok: [''],
      sh_twitter: [''],
      sh_youtube: [''],
    });

    this.usernameService.get('profile').subscribe((res) => {
      res.data.background_img = this.baseUrl + res.data.background_img;
      res.data.profile_pic_img = this.baseUrl + res.data.profile_pic_img;
      this.data = res.data;
    });
  }

  get f() {
    return this.editForm.controls;
  }

  get f1() {
    return this.changeForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.editForm.invalid) {
      return;
    } else {
      this.usernameService
        .post('profile', this.editForm.value)
        .subscribe((res) => {
          this.toastr.success(res.message);
          this.router.navigate(['/admin/profile']);
        });
    }
  }

  onChangeSubmit() {
    this.changeSubmit = true;

    if (this.changeForm.invalid) {
      return;
    } else {
      delete this.changeForm.value.confirmpassword;
      this.usernameService
        .post('resetpassword', this.changeForm.value)
        .subscribe((res) => {
          this.toastr.success(res.message);
        });
      this.router.navigate(['/admin/login']);
    }
  }
}
