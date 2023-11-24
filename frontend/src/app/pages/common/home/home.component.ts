import { AfterViewInit, Component, OnInit } from '@angular/core';

declare var $: any;
declare var mouseWheelHandler: any;
declare var Swiper: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, AfterViewInit {
  constructor() {}

  ngOnInit(): void {
    $('body').removeClass('scrolled');
  }

  ngAfterViewInit() {
    $(document).ready(function () {
      const $slider = $('#slider');
      let influencerScrollTop = 0;
      let brandScrollTop = 0;
      let aboutScrollTop = 0;
      let affiliateScrollTop = 0;
      $slider.on('init', () => {
        $(window).on(
          'wheel',
          {
            $slider: $slider,
          },
          mouseWheelHandler
        );
      });
      var swiper = new Swiper('.slider', {
        direction: 'horizontal',
        loop: true,
        speed: 600,
        hashNavigation: true,
        simulateTouch: false,
        spaceBetween: 0,
        fade: true,
        autoplay: false,
        clickable: true,
        arrows: true,
        navigation: {
          nextEl: '.slide_next',
          prevEl: '.slide_prev',
        },
        on: {
          slideChange: function () {
            $(this.slides.eq(this.activeIndex))
              .find('div.reveal-eff')
              .addClass('img1');
            setTimeout(function () {
              $('.swiper-slide div.img1').removeClass('img1');
            }, 1000);
          },
        },
      });
      $('.down').click(function () {
        swiper.slideTo(5, 0);
        setTimeout(() => {
          $('body').removeClass('scrolled');
        }, 100);
      });
      $('.afil').click(function () {
        swiper.slideTo(4, 0);
        setTimeout(() => {
          $('body').removeClass('scrolled');
        }, 100);
      });
      $('.influence').click(function () {
        console.log('clicked');
        swiper.slideTo(1, 0);
        setTimeout(() => {
          $('body').removeClass('scrolled');
        }, 100);
      });
      $('div#influencerDiv').scroll(function (e) {
        var st = $(this).scrollTop();
        if (st > influencerScrollTop) {
          if (st == 0) {
            $('body').removeClass('scrolled');
          } else if (st != 0 && st < window.outerHeight) {
            $('body').addClass('scrolled');
            document.getElementById('influencerDiv').scrollTop =
              window.outerHeight;
          } else {
            $('body').addClass('scrolled');
          }
        } else {
          if (st < 200 || st == 0) {
            $('body').removeClass('scrolled');
          }
        }
        influencerScrollTop = st;
      });
      $('div#brandDiv').scroll(function () {
        var st = $(this).scrollTop();
        if (st > brandScrollTop) {
          if (st == 0) {
            $('body').removeClass('scrolled');
          } else if (st != 0 && st < window.outerHeight) {
            $('body').addClass('scrolled');
            document.getElementById('brandDiv').scrollTop = window.outerHeight;
          } else {
            $('body').addClass('scrolled');
          }
        } else {
          if (st < 200 || st == 0) {
            $('body').removeClass('scrolled');
          }
        }
        brandScrollTop = st;
      });
      $('div#aboutDiv').scroll(function () {
        var st = $(this).scrollTop();
        if (st > aboutScrollTop) {
          if (st == 0) {
            $('body').removeClass('scrolled');
          } else if (st != 0 && st < window.outerHeight) {
            $('body').addClass('scrolled');
            document.getElementById('aboutDiv').scrollTop = window.outerHeight;
          } else {
            $('body').addClass('scrolled');
          }
        } else {
          if (st < 200 || st == 0) {
            $('body').removeClass('scrolled');
          }
        }
        aboutScrollTop = st;
      });
      $('div#afiliateDiv').scroll(function () {
        var st = $(this).scrollTop();
        if (st > affiliateScrollTop) {
          if (st == 0) {
            $('body').removeClass('scrolled');
          } else if (st != 0 && st < window.outerHeight) {
            $('body').addClass('scrolled');
            document.getElementById('afiliateDiv').scrollTop =
              window.outerHeight;
          } else {
            $('body').addClass('scrolled');
          }
        } else {
          if (st < 200 || st == 0) {
            $('body').removeClass('scrolled');
          }
        }
        affiliateScrollTop = st;
      });
      document.querySelectorAll('.dslide').forEach(function (el) {
        el.addEventListener('click', function (e) {
          e.preventDefault();
          var $i = parseInt(el.getAttribute('data-slide')) + 1;
          swiper.slideTo($i, 0);
        });
      });
      $('.cust-main-sec-tg').on('click', function (e) {
        $('body').addClass('filter-pop-open');
        e.stopPropagation();
        $('body').after('<div class="notifaction-src-backdroup"></div>');
      });
      $('.dslide, .filter-src-close').on('click', function (e) {
        $('body').removeClass('filter-pop-open');
        $('.notifaction-src-backdroup').remove();
      });
      $(document).on('click', function (e) {
        if ($(e.target).closest('.notifaction-src-main').length > 0) return;
        $('.notifaction-src-backdroup').remove();
        if ($(e.target).is('body') === false) {
          $('body').removeClass('filter-pop-open');
        }
      });
      $('.modal-cust-left .modal-content').perfectScrollbar();
    });
    setInterval(() => {
      if ($('.slide-btn').hasClass('swiper-slide-active')) {
        $('body').addClass('btnremove');
      } else {
        $('body').removeClass('btnremove');
      }
    }, 1);
    $('.arrow').on('click touch', function (e) {
      e.preventDefault();
      let arrow = $(this);
      if (!arrow.hasClass('animate')) {
        arrow.addClass('animate');
        setTimeout(() => {
          arrow.removeClass('animate');
        }, 1600);
      }
    });
    $('.close.close-modal').on('click', function () {
      $(this).closest('.swiper-slide').animate({ scrollTop: 0 }, 100);
      return true;
    });
  }
}
