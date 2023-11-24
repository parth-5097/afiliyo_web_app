import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-influencer-apply',
  templateUrl: './influencer-apply.component.html',
  styleUrls: ['./influencer-apply.component.css'],
})
export class InfluencerApplyComponent implements OnInit, AfterViewInit {
  apply: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  onRedirect(val) {
    this.router.navigateByUrl(`#${val}`);
  }

  ngAfterViewInit(): void {
    $(document).ready(function () {
      $('#signup').click(function () {
        var fname = $('#fname').val();
        var lname = $('#lname').val();
        var email = $('#email').val();
        var cselect = $('#cselect').val();
        if (fname == '') {
          $('.fname').addClass('is-invalid');
        } else {
          $('.fname').removeClass('is-invalid');
        }

        if (lname == '') {
          $('.lname').addClass('is-invalid');
        } else {
          $('.lname').removeClass('is-invalid');
        }

        if (email == '') {
          $('.email').addClass('is-invalid');
        } else {
          $('.email').removeClass('is-invalid');
        }
        if (cselect == '') {
          $('.cselect').addClass('is-invalid');
        } else {
          $('.cselect').removeClass('is-invalid');
        }
      });
    });

    $(document).ready(function () {
      $('.nav-tabs > li a[title]').tooltip();
      $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
        var target = $(e.target);
        if (target.parent().hasClass('disabled')) {
          return false;
        }
      });
      $(document).on('click', '.next-step', function () {
        var active = $('.wizard .nav-tabs li.active');
        active.next().removeClass('disabled');
        nextTab(active);
      });
      $(document).on('click', '.prev-step', function () {
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
    function changeFunction() {
      var selectedValue = $('#selectBox option:selected').val();
      if (selectedValue == 'MBA') {
        $('.textbox-form').show();
      } else {
        alert('Error');
        $('.textbox-form').hide();
      }
    }
    function postchangeFunction() {
      var selectedValue = $('#postSelectBox option:selected').val();
      if (selectedValue == 'MBA') {
        $('.posttextbox-form').show();
      } else {
        alert('Error');
        $('.posttextbox-form').hide();
      }
    }
    function postingFuncion() {
      $('.add-posting').hide();
      $('.show-posting-select').show();
    }
  }
}
