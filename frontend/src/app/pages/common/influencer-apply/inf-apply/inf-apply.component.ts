import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonRouteService } from 'src/app/service/common-route.service';
declare var $: any;

@Component({
  selector: 'app-inf-apply',
  templateUrl: './inf-apply.component.html',
  styleUrls: ['./inf-apply.component.css'],
})
export class InfApplyComponent implements OnInit, AfterViewInit {
  inf1Form: FormGroup;
  inf2Form: FormGroup;
  influencerForm: FormGroup;
  submitted = false;
  submit = false;
  inf1Submitted = false;
  inf2 = false;

  radioData1 = [
    'Improve content quality and/or consistency.',
    'More tools to monetize content',
    'Grow followers and/or improve engagement.',
  ];

  radioData2 = [
    'Full time. I want to make this a career',
    'A couple of hours a week,I want money on the side',
    "I don't have monetary goals,I just create content for fun",
  ];

  state: any[] = [];

  payload: any = {};
  constructor(
    private formBuilder: FormBuilder,
    private commonService: CommonRouteService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.commonService.get('state/IN').subscribe((res) => {
      this.state = res.data;
    });

    this.payload.page = 'influencer-apply';
    this.inf1Form = this.formBuilder.group({
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
      primaryAudiance: ['', Validators.required],
    });
    this.inf2Form = this.formBuilder.group({
      primaryPostingc: ['', Validators.required],
      url1: ['', Validators.required],
    });
    this.influencerForm = this.formBuilder.group({
      categoriesHelp: ['', Validators.required],
      timeToCreate: ['', Validators.required],
      acceptTerms: [false, Validators.requiredTrue],
    });
  }

  ngAfterViewInit(): void {
    let form1 = this.inf1Form;
    let form2 = this.inf2Form;
    $(document).ready(function () {
      $('.nav-tabs > li a[title]').tooltip();
      $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
        var target = $(e.target);
        if (target.parent().hasClass('disabled')) {
          return false;
        }
      });
      $('.next-step1').click(function (e) {
        if (!form1.invalid) {
          e.stopImmediatePropagation();
          var active = $('.wizard .nav-tabs li.active');
          active.next().removeClass('disabled');
          nextTab(active);
        }
      });
      $('.next-step2').click(function (e) {
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
      $('.privacy-policy-toggle').on('click', function (e) {
        e.stopImmediatePropagation();
        $('.policy-text').toggle();
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

  changeFunction() {
    var selectedValue = (<HTMLInputElement>document.getElementById('selectBox'))
      .value;

    if (selectedValue == 'MBA') {
      $('.textbox-form').show();
    } else {
      this.toastr.error('Error');
      $('.textbox-form').hide();
    }
  }
  postchangeFunction() {
    var selectedValue = (<HTMLInputElement>(
      document.getElementById('postselectBox')
    )).value;

    if (selectedValue == 'MBA') {
      $('.posttextbox-form').show();
    } else {
      alert('Error');
      $('.posttextbox-form').hide();
    }
  }
  postingFuncion() {
    $('.add-posting').hide();
    $('.show-posting-select').show();
  }

  get f() {
    return this.inf1Form.controls;
  }

  get f1() {
    return this.influencerForm.controls;
  }

  get f2() {
    return this.inf2Form.controls;
  }

  onNext1() {
    this.inf1Submitted = true;

    if (this.inf1Form.invalid) {
      this.toastr.error('Required field must be provided');
      return;
    }
  }

  onNext2() {
    this.inf2 = true;

    if (this.inf2Form.invalid) {
      this.toastr.error('Required field must be provided');
      return;
    }
  }

  onSelectRequest(e, n) {
    if (e.target.checked) {
      this.payload[n] = e.target.value;
    } else {
      delete this.payload[n];
    }
  }

  onSubmit() {
    this.submitted = true;

    if (this.influencerForm.invalid) {
      this.toastr.error('Required field must be provided');
      return;
    } else {
      this.submit = true;
      this.influencerForm.value.page = 'influencer-apply';
      let temp = {
        ...this.payload,
        ...this.inf1Form.value,
        ...this.influencerForm.value,
      };
      this.commonService.post('form', temp).subscribe((res) => {
        this.toastr.success(res.message);
        setTimeout(() => {
          this.router.navigate(['influencer/apply']);
        }, 10);
      });
    }
  }

  onCancel() {
    this.router.navigate(['/']);
  }
}
