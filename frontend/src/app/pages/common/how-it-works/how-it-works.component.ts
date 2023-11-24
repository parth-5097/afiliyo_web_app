import { AfterViewInit, Component, OnInit } from '@angular/core';

declare var $: any;
declare var Swiper: any;

@Component({
  selector: 'app-how-it-works',
  templateUrl: './how-it-works.component.html',
  styleUrls: ['./how-it-works.component.css'],
})
export class HowItWorksComponent implements OnInit, AfterViewInit {
  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    $('.box-1').on('click', function () {
      $('.section-one').show();
      $('.section-two').hide();
      $('.section-three').hide();
      $('.section-arrow-three').hide();
      $('.section-arrow-four').show();
      $('.section-arrow-one').show();
      $('.section-arrow-two').hide();
      $('.section-arrow-five').hide();
      $('.section-arrow-six').show();
    });
    $('.box-2').on('click', function () {
      $('.section-one').hide();
      $('.section-two').show();
      $('.section-three').hide();
      $('.section-arrow-three').show();
      $('.section-arrow-four').hide();
      $('.section-arrow-one').hide();
      $('.section-arrow-two').show();
      $('.section-arrow-five').hide();
      $('.section-arrow-six').show();
    });

    $('.box-3').on('click', function () {
      $('.section-one').hide();
      $('.section-two').hide();
      $('.section-three').show();
      $('.section-arrow-three').hide();
      $('.section-arrow-six').hide();
      $('.section-arrow-five').show();
      $('.section-arrow-four').show();
      $('.section-arrow-one').hide();
      $('.section-arrow-two').show();
    });
    $('.box-4').on('click', function () {
      $('.section-five').hide();
      $('.section-six').hide();
      $('.section-four').show();
      $('.section-arrow-eight').hide();
      $('.section-arrow-saven').show();
      $('.section-arrow-nine').hide();
      $('.section-arrow-ten').show();
      $('.section-arrow-eleven').hide();
      $('.section-arrow-twelve').show();
    });
    $('.box-5').on('click', function () {
      $('.section-four').hide();
      $('.section-six').hide();
      $('.section-five').show();
      $('.section-arrow-saven').hide();
      $('.section-arrow-eight').show();
      $('.section-arrow-ten').hide();
      $('.section-arrow-nine').show();
      $('.section-arrow-eleven').hide();
      $('.section-arrow-twelve').show();
    });
    $('.box-6').on('click', function () {
      $('.section-four').hide();
      $('.section-five').hide();
      $('.section-six').show();
      $('.section-arrow-saven').hide();
      $('.section-arrow-eight').show();
      $('.section-arrow-nine').hide();
      $('.section-arrow-ten').show();
      $('.section-arrow-twelve').hide();
      $('.section-arrow-eleven').show();
    });

    $('.box-inner').on('click', function () {
      $('.box-inner.text-color-change').removeClass('text-color-change');
      $(this).addClass('text-color-change');
    });

    $('.box-inner-new').on('click', function () {
      $('.box-inner-new.text-color-change-new').removeClass(
        'text-color-change-new'
      );
      $(this).addClass('text-color-change-new');
    });

    var swiper = new Swiper('.swiper-container', {
      autoplay: true,
      speed: 1000,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
    });
    var swiper = new Swiper('.swiper-container.swiper-second', {
      autoplay: true,
      speed: 1000,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
    });
  }
}
