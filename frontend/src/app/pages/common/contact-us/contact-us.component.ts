import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CommonRouteService } from 'src/app/service/common-route.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css'],
})
export class ContactUsComponent implements OnInit {
  contactForm: FormGroup;
  submitted = false;
  submit = false;

  constructor(
    private formBuilder: FormBuilder,
    private commonService: CommonRouteService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.contactForm = this.formBuilder.group({
      name: ['', Validators.required],
      subject: ['', Validators.required],
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/),
        ],
      ],
      contactno: [
        '',
        [Validators.required, Validators.pattern(/^(?:[0-9] ?){9}[0-9]$/)],
      ],
      message: ['', Validators.required],
    });
  }

  get f() {
    return this.contactForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.contactForm.invalid) {
      return;
    } else {
      this.submit = true;
      this.contactForm.value.page = 'contact-us';
      this.commonService
        .post('form', this.contactForm.value)
        .subscribe((res) => {
          this.commonService
            .post('mail', {
              email: this.contactForm.value.email,
              message: 'Thank you for contacting us',
            })
            .subscribe((res) => {
              this.submitted = false;
              this.submit = false;
              this.contactForm.reset();
              this.toastr.success(res.message);
            });
        });
    }
  }
}
