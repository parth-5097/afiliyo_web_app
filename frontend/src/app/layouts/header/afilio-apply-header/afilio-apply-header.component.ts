import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-afilio-apply-header',
  templateUrl: './afilio-apply-header.component.html',
  styleUrls: ['./afilio-apply-header.component.css'],
})
export class AfilioApplyHeaderComponent implements OnInit, AfterViewInit {
  currentClass: any;
  constructor(private router: Router) {}

  ngOnInit(): void {
    if (window.location.href.match('/influencer/apply')) {
      this.currentClass =
        'navbar navbar-expand-lg navbar-light bg-light-blue main-menu influencer-page';
    } else if (window.location.href.match('/brand/apply')) {
      this.currentClass =
        'navbar navbar-expand-lg navbar-light bg-light-blue main-menu brand-page';
    } else if (window.location.href.match('/career/apply')) {
      this.currentClass =
        'navbar navbar-expand-lg navbar-light bg-light-blue main-menu careers-page';
    } else if (
      window.location.href.match('/contactus') ||
      window.location.href.match('/faq')
    ) {
      this.currentClass =
        'navbar navbar-expand-lg navbar-light bg-light-blue main-menu contactus-page';
    } else if (window.location.href.match('/how-it-works')) {
      this.currentClass =
        'navbar navbar-expand-lg navbar-light bg-light-blue main-menu careers-page bg-blue bg-green';
    } else {
      this.currentClass =
        'navbar navbar-expand-lg navbar-light bg-light-blue main-menu influencer-page';
    }
  }

  onRedirect(val) {
    this.router.navigateByUrl(`#${val}`);
  }

  ngAfterViewInit() {
    $(document).ready(function () {
      var url = window.location.href;

      if (url.match('/influencer/apply')) {
        $('.influencer-page').addClass('bg-blue');
      } else if (url.match('/brand/apply')) {
        $('.brand-page').addClass('bg-yellow');
      } else if (url.match('/career/apply')) {
        $('.careers-page').addClass('bg-green');
      } else if (url.match('/influencer/infapply')) {
        $('.influencer-page').addClass('bg-blue');
      } else if (url.match('/privacy')) {
        $('.influencer-page').addClass('bg-blue');
      } else if (url.match('/contactus') || url.match('/faq')) {
        $('.contactus-page').addClass('bg-skyblue');
      } else {
        $('.influencer-page').addClass('bg-blue');
      }
    });
  }
}
