import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AES, enc } from 'crypto-js';
import { ToastrService } from 'ngx-toastr';
import { CommonRouteService } from 'src/app/service/common-route.service';
import { environment } from 'src/environments/environment.prod';

declare var $: any;
declare var Swiper: any;

@Component({
  selector: 'app-calculator-slider',
  templateUrl: './calculator-slider.component.html',
  styleUrls: ['./calculator-slider.component.css'],
})
export class CalculatorSliderComponent implements OnInit, AfterViewInit {
  calcForm: FormGroup;
  data: any;
  tempData: any;
  converted: any;
  convertedData: any;
  temp: any;
  inr: any;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private commonRoute: CommonRouteService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.calcForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/),
        ],
      ],
      company: ['', Validators.required],
      website: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi
          ),
        ],
      ],
      country: ['', Validators.required],
      client: [''],
    });
    this.route.queryParams.subscribe((params) => {
      var bytes = AES.decrypt(params.id, environment.CALC_KEY);
      this.data = JSON.parse(bytes.toString(enc.Utf8));
    });
    this.convertedData =
      (this.data.siteVisitor *
        this.data.convRate *
        this.data.avgOrder *
        this.data.customer) /
      100;

    this.converted = this.test(this.convertedData);
    this.tempData =
      (this.data.siteVisitor *
        (this.data.convRate * 0.46 - -this.data.convRate) *
        (this.data.avgOrder * 0.23 - -this.data.avgOrder) *
        (this.data.customer * 0.04 - -this.data.customer)) /
      100;

    this.temp = this.test(this.tempData);
  }

  ngAfterViewInit(): void {
    var swiper = new Swiper('.swiper-container', {
      speed: 600,
      parallax: true,
      simulateTouch: false,
      dots: false,
      navigation: {
        nextEl: '.slide_next',
        prevEl: '.slide_prev',
      },
    });

    $('.animated-progress span').each(function () {
      $(this).animate(
        {
          width: $(this).attr('data-progress') + '%',
        },
        1000
      );
      $(this).text($(this).attr('data-progress') + '%');
    });
  }

  get f() {
    return this.calcForm.controls;
  }

  test(labelValue) {
    return Math.abs(Number(labelValue)) >= 1.0e9
      ? (Math.abs(Number(labelValue)) / 1.0e9).toFixed(2) + ' Billion'
      : Math.abs(Number(labelValue)) >= 1.0e6
      ? (Math.abs(Number(labelValue)) / 1.0e6).toFixed(2) + ' Million'
      : Math.abs(Number(labelValue)) >= 1.0e3
      ? (Math.abs(Number(labelValue)) / 1.0e3).toFixed(2) + ' Thousand'
      : Math.abs(Number(labelValue)).toFixed(2);
  }

  onSubmit() {
    this.submitted = true;

    if (this.calcForm.invalid) {
      return;
    }
    let payload = {
      email: this.calcForm.value.email,
      data: this.data,
    };
    this.commonRoute.post('mail', payload).subscribe((res) => {
      this.toastr.success(res.message);
      setTimeout(() => {
        this.router.navigate(['']);
      }, 1);
    });
  }
}
