import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonRouteService } from 'src/app/service/common-route.service';
declare var $: any;

@Component({
  selector: 'app-brand-apply',
  templateUrl: './brand-apply.component.html',
  styleUrls: ['./brand-apply.component.css'],
})
export class BrandApplyComponent implements OnInit, AfterViewInit {
  brandForm: FormGroup;
  form1: FormGroup;
  form2: FormGroup;
  submitted = false;
  submit = false;
  f1 = false;
  form12 = false;
  payload: any = {};

  marketingBudgetAllocation = [
    'Flat Fee or Sponsored Posts',
    'PR',
    'Outdoor',
    'Direct Mail',
    'Social Media',
  ];

  constructor(
    private formBuilder: FormBuilder,
    private commonService: CommonRouteService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.payload.page = 'brand-apply';
    this.form1 = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      primaryVerticle: ['', Validators.required],
      companyName: ['', Validators.required],
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/),
        ],
      ],
      website: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi
          ),
        ],
      ],
      acceptTerms: [false, Validators.requiredTrue],
    });
    this.form2 = this.formBuilder.group({
      hqLocation: ['', Validators.required],
      parentCompanyName: [''],
      reference: ['', Validators.required],
      secondaryBrand: ['', Validators.required],
      roleForCompany: ['', Validators.required],
      pastConnection: ['', Validators.required],
      anualSales: ['', Validators.required],
      socialInsta: ['', Validators.required],
      instaFollowing: ['', Validators.required],
      socialTwitter: ['', Validators.required],
      twitterFollowing: ['', Validators.required],
      socialFacebook: ['', Validators.required],
      facebookFollowing: ['', Validators.required],
      marketBudget: [''],
      marketingBudget: ['', Validators.required],
    });
    this.brandForm = this.formBuilder.group({
      uniqueProduct: ['', Validators.required],
      totalOrder: ['', Validators.required],
      averageConversationRate: ['', Validators.required],
      affiliateMarketingNetwork: ['', Validators.required],
      notInvolved: ['', Validators.required],
      agreementFor10: [false, Validators.requiredTrue],
    });
  }
  ngAfterViewInit(): void {
    let form1 = this.form1;
    let form2 = this.form2;
    $(document).ready(function () {
      $('.nav-tabs > li a[title]').tooltip();
      $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
        var target = $(e.target);
        if (target.parent().hasClass('disabled')) {
          return false;
        }
      });
      $('.next1').click(function (e) {
        e.stopImmediatePropagation();
        if (!form1.invalid) {
          var active = $('.wizard .nav-tabs li.active');
          active.next().removeClass('disabled');
          nextTab(active);
        }
      });
      $('.next2').click(function (e) {
        if (!form2.invalid) {
          e.stopImmediatePropagation();
          var active = $('.wizard .nav-tabs li.active');
          active.next().removeClass('disabled');
          nextTab(active);
        }
      });
      $('.prev-step').click(function (e) {
        e.stopImmediatePropagation();
        var active = $('.wizard .nav-tabs li.active');
        prevTab(active);
      });
    });
    function nextTab(elem) {
      $(elem).next().find('a[data-toggle="tab"]').click();
    }
    function prevTab(elem) {
      $(elem).prev().find('a[data-toggle="tab"]').click();
    }
    $('.nav-tabs').on('click', 'li', function () {
      $('.nav-tabs li.active').removeClass('active');
      $(this).addClass('active');
    });
  }

  get f() {
    return this.form1.controls;
  }

  get f2() {
    return this.form2.controls;
  }

  get f3() {
    return this.brandForm.controls;
  }

  onSelectRequest(e, n) {
    let temp = this.payload[n] ? this.payload[n] : {};
    if (e.target.checked) {
      temp[e.target.value] = e.target.value;
    } else {
      delete temp[e.target.value];
    }
    this.payload[n] = temp;
  }

  onForm1() {
    this.f1 = true;
    if (this.form1.invalid) {
      this.toastr.error('Required field must be provided');
      return;
    }
  }

  onForm2() {
    this.form12 = true;
    if (this.form2.invalid) {
      this.toastr.error('Required field must be provided');
      return;
    }
  }

  onSubmit() {
    this.submitted = true;

    if (this.brandForm.invalid) {
      this.toastr.error('Required field must be provided');
      return;
    } else {
      this.submit = true;
      this.commonService
        .post('form', {
          ...this.payload,
          ...this.form1.value,
          ...this.form2.value,
          ...this.brandForm.value,
        })
        .subscribe((res) => {
          this.toastr.success(res.message);
          setTimeout(() => {
            window.location.reload();
          }, 0);
        });
    }
  }

  onRequest() {
    this.router.navigate(['/']);
  }
}
