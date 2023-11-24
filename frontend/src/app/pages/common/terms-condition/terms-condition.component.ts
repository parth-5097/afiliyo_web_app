import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-terms-condition',
  templateUrl: './terms-condition.component.html',
  styleUrls: ['./terms-condition.component.css'],
})
export class TermsConditionComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    $('.notifaction-src-backdroup').removeClass('notifaction-src-backdroup');
  }
}
