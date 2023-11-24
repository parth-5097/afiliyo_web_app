import { AfterViewInit, Component, OnInit } from '@angular/core';
import { UsernameService } from 'src/app/service/username.service';
import { environment } from 'src/environments/environment.prod';

declare var $: any;

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css'],
})
export class AdminHeaderComponent implements OnInit, AfterViewInit {
  data: any;
  readonly baseUrl: any = environment.PORT_URL;

  constructor(private usernameService: UsernameService) {}

  ngOnInit(): void {
    this.usernameService.get('profile').subscribe((res) => {
      res.data.background_img = this.baseUrl + res.data.background_img;
      res.data.profile_pic_img = this.baseUrl + res.data.profile_pic_img;
      this.data = res.data;
    });
  }

  ngAfterViewInit() {
    $(function () {
      $('.toggle-icon-main').on('click', function (e) {
        e.preventDefault();
        $('.dash-wrapper').toggleClass('toggled-custom-class');
      });

      $('.header-user-profile-inner-cust').on('click', function (e) {
        $(this).toggleClass('active');
        e.stopPropagation();
      });
      $(document).on('click', function (e) {
        if ($(e.target).closest('.header-user-profile-inner-cust').length > 0)
          return;
        if ($(e.target).is('.header-user-profile-inner-cust') === false) {
          $('.header-user-profile-inner-cust').removeClass('active');
        }
      });

      $(window).on('unload', function () {
        $(window).scrollTop(0);
      });

      var current = location.pathname.substring(
        location.pathname.lastIndexOf('/') + 1
      );
      $('.sidebar-main-inner-menu li a').each(function () {
        var $this = $(this);
        if ($this.attr('href').indexOf(current) !== -1) {
          $this.addClass('active');
        }
      });

      const $menu = $('.notification-custom-main');
      $(document).mouseup((e) => {
        if (!$menu.is(e.target) && $menu.has(e.target).length === 0) {
          $menu.removeClass('active');
        }
      });
      $('.notification-click').on('click', () => {
        $menu.toggleClass('active');
      });

      $('.hdr-top-box-inr-icon').click(function () {
        $('.search-form-wrapper').toggleClass('active');
      });

      $('.hdr-top-box i').click(function () {
        $('.responsive-view-menu').toggleClass('active');
      });

      $('.hdr-top-box i').click(function () {
        $('.search-form-wrapper').removeClass('active');
      });

      $('.hdr-top-box-inr-icon').click(function () {
        $('.responsive-view-menu').removeClass('active');
      });
    });
  }
}
