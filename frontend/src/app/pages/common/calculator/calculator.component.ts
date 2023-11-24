import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { AES } from 'crypto-js';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css'],
})
export class CalculatorComponent implements OnInit {
  calculatorForm: FormGroup;
  submitted = false;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.calculatorForm = this.formBuilder.group({
      siteVisitor: ['', Validators.required],
      convRate: ['', Validators.required],
      avgOrder: ['', Validators.required],
      customer: ['', Validators.required],
    });
  }

  get f() {
    return this.calculatorForm.controls;
  }

  onRequest() {
    this.submitted = true;

    if (this.calculatorForm.invalid) {
      this.toastr.error('Require field must be provided');
      return;
    } else {
      let temp = this.calculatorForm.value;
      let queryParams = {
        siteVisitor: temp.siteVisitor,
        convRate: temp.convRate,
        avgOrder: temp.avgOrder,
        customer: temp.customer,
      };
      var ciphertext = AES.encrypt(
        JSON.stringify(queryParams),
        environment.CALC_KEY
      ).toString();
      let navigationExtra: NavigationExtras = {
        queryParams: {
          id: ciphertext,
        },
      };
      this.router.navigate(['/calc'], navigationExtra);
    }
  }
}
