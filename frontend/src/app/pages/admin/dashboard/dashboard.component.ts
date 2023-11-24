import { Component, OnInit } from '@angular/core';

import {
  ApexAnnotations,
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexFill,
  ApexGrid,
  ApexLegend,
  ApexPlotOptions,
  ApexResponsive,
  ApexStates,
  ApexStroke,
  ApexTheme,
  ApexTitleSubtitle,
  ApexTooltip,
  ApexXAxis,
  ApexYAxis,
} from 'ng-apexcharts';
import { UsernameService } from 'src/app/service/username.service';
import { WebSocketService } from 'src/app/service/web-socket.service';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
  colors: string[];
  annotations: ApexAnnotations;
  dataLabels: ApexDataLabels;
  stroke: ApexStroke;
  labels: string[];
  legend: ApexLegend;
  fill: ApexFill;
  tooltip: ApexTooltip;
  plotOptions: ApexPlotOptions;
  responsive: ApexResponsive[];
  yaxis: ApexYAxis;
  grid: ApexGrid;
  states: ApexStates;
  subtitle: ApexTitleSubtitle;
  theme: ApexTheme;
};

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  postCountOnDifferentDay: Partial<any>;
  itemCountOnDifferentDay: Partial<any>;
  userCountOnDifferentDay: Partial<any>;
  GenderDifferenceOnItem: Partial<any>;
  GenderDifferenceOnUser: Partial<any>;
  regionDifferenceOnUser: Partial<any>;
  cashOnHandChartOptions: Partial<any>;
  totalPurchaseOptions: Partial<any>;
  averageSaleOptions: Partial<any>;
  chartRecentOptions: Partial<any>;
  chartInventoryOptions: Partial<any>;
  live_data: any = {};
  time: any;
  objectKeys: any = Object.keys;

  constructor(
    private socketService: WebSocketService,
    private usernameService: UsernameService
  ) {
    this.socketService.listen('LIVE_COUNT').subscribe((res) => {
      this.live_data = res;
      this.live_data.totalLivePostViewer = Object.keys(
        this.live_data.livePostViewer
      ).length;
    });

    this.socketService.listen('COUNTRY_TIME').subscribe((res) => {
      this.time = res;
    });
  }

  ngOnInit(): void {
    this.usernameService.get('date-uip/30').subscribe((res) => {
      this.setChart(res.post);
      this.postCountOnDifferentDay = {
        series: [
          {
            data: Array.from(res.post).map((el: any) => el.y),
          },
        ],
        colors: ['#FF2366'],
        chart: {
          type: 'area',
          height: 120,
          sparkline: {
            enabled: true,
          },
          stacked: true,
          zoom: {
            enabled: false,
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          show: true,
          curve: 'smooth',
          width: 1,
          dashArray: 0,
        },
        grid: {
          row: {
            colors: ['transparent', 'transparent'],
            opacity: 0.5,
          },
        },
        legend: {
          show: false,
        },
        fill: {
          opacity: 1,
        },
        xaxis: {
          type: 'category',
          categories: Array.from(res.post).map(
            (el: any) => new Date(el.x).toISOString().split('T')[0]
          ),
        },
        yaxis: {
          show: false,
        },
      };
      this.itemCountOnDifferentDay = {
        series: [
          {
            data: Array.from(res.item).map((el: any) => el.y),
          },
        ],
        colors: ['#4791FF'],
        chart: {
          type: 'area',
          height: 120,
          sparkline: {
            enabled: true,
          },
          stacked: true,
          zoom: {
            enabled: false,
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          show: true,
          curve: 'smooth',
          width: 1,
          dashArray: 0,
        },
        grid: {
          row: {
            colors: ['transparent', 'transparent'],
            opacity: 0.5,
          },
        },
        legend: {
          show: false,
        },
        fill: {
          opacity: 1,
        },
        xaxis: {
          type: 'category',
          categories: Array.from(res.item).map(
            (el: any) => new Date(el.x).toISOString().split('T')[0]
          ),
        },
        yaxis: {
          show: false,
        },
      };
      this.userCountOnDifferentDay = {
        series: [
          {
            data: Array.from(res.user).map((el: any) => el.y),
          },
        ],
        colors: ['#02BC77'],
        chart: {
          type: 'area',
          height: 120,
          sparkline: {
            enabled: true,
          },
          stacked: true,
          zoom: {
            enabled: false,
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          show: true,
          curve: 'smooth',
          width: 1,
          dashArray: 0,
        },
        grid: {
          row: {
            colors: ['transparent', 'transparent'],
            opacity: 0.5,
          },
        },
        legend: {
          show: false,
        },
        fill: {
          opacity: 1,
        },
        xaxis: {
          type: 'category',
          categories: Array.from(res.user).map(
            (el: any) => new Date(el.x).toISOString().split('T')[0]
          ),
        },
        yaxis: {
          show: false,
        },
      };
    });
    this.usernameService.get('choice-uip').subscribe((res) => {
      console.log(res);
      this.GenderDifferenceOnItem = {
        series: [
          res.itemGender.male,
          res.itemGender.female,
          res.itemGender.not_specified,
        ],
        chart: {
          type: 'donut',
          height: '300',
          size: '65%',
        },
        donut: {
          size: '65%',
        },
        colors: ['#02BC77', '#FF2366', '#4791FF'],
        stroke: {
          curve: 'smooth',
          width: 2,
        },
        markers: {
          size: 10,
          colors: ['#02BC77', '#4791FF'],
          shape: 'circle',
          radius: 10,
          hover: {
            sizeOffset: 2,
          },
        },
        legend: {
          position: 'bottom',
          horizontalAlign: 'right',
        },
        fill: {
          opacity: 1,
        },
      };
      this.GenderDifferenceOnUser = {
        series: [
          res.userGender.male,
          res.userGender.female,
          res.userGender.not_specified,
        ],
        chart: {
          type: 'donut',
          height: '300',
          size: '65%',
        },
        donut: {
          size: '65%',
        },
        colors: ['#02BC77', '#FF2366', '#4791FF'],
        stroke: {
          curve: 'smooth',
          width: 2,
        },
        markers: {
          size: 10,
          colors: ['#02BC77', '#4791FF'],
          shape: 'circle',
          radius: 10,
          hover: {
            sizeOffset: 2,
          },
        },
        legend: {
          position: 'bottom',
          horizontalAlign: 'right',
        },
        fill: {
          opacity: 1,
        },
      };
      this.regionDifferenceOnUser = {
        series: Array.from(res.regionUser).map((el: any) => el.region_user),
        chart: {
          type: 'donut',
          height: '300',
          size: '65%',
        },
        donut: {
          size: '65%',
        },
        colors: ['#02BC77', '#FF2366', '#4791FF'],
        stroke: {
          curve: 'smooth',
          width: 2,
        },
        markers: {
          size: 10,
          colors: ['#02BC77', '#4791FF'],
          shape: 'circle',
          radius: 10,
          hover: {
            sizeOffset: 2,
          },
        },
        legend: {
          position: 'bottom',
          horizontalAlign: 'right',
        },
        fill: {
          opacity: 1,
        },
      };
    });
  }

  setChart(data) {
    this.cashOnHandChartOptions = {
      series: [
        {
          data: Array.from(data).map((el: any) => new Date(el.x).getDate()),
        },
        {
          data: Array.from(data).map((el: any) => el.y),
        },
      ],
      colors: ['#FF2366', '#F0EFEF'],
      chart: {
        type: 'bar',
        height: 120,
        sparkline: {
          enabled: true,
        },
        stacked: true,
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        curve: 'smooth',
        width: 1,
        dashArray: 0,
      },
      grid: {
        row: {
          colors: ['transparent', 'transparent'],
          opacity: 0.5,
        },
      },
      legend: {
        show: false,
      },
      fill: {
        opacity: 1,
      },
      xaxis: {
        type: 'category',
        categories: Array.from(data).map(
          (el: any) => new Date(el.x).toISOString().split('T')[0]
        ),
      },
      yaxis: {
        type: 'category',
        categories: Array.from(data).map((el: any) => 'post'),
      },
    };
    this.totalPurchaseOptions = {
      series: [
        {
          data: [13, 23, 20, 8, 13, 27, 44, 55, 41, 67, 22, 43, 41, 67, 22, 43],
        },
        {
          data: [44, 55, 41, 67, 22, 43, 41, 67, 22, 43, 13, 23, 20, 8, 13, 27],
        },
      ],
      colors: ['#02BC77', '#4791FF'],
      chart: {
        type: 'area',
        height: 120,
        sparkline: {
          enabled: true,
        },
        stacked: true,
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        curve: 'smooth',
        width: 1,
        dashArray: 0,
      },
      grid: {
        row: {
          colors: ['transparent', 'transparent'],
          opacity: 0.5,
        },
      },
      legend: {
        show: false,
      },
      fill: {
        opacity: 1,
      },
      yaxis: {
        show: false,
      },
    };
    this.chartRecentOptions = {
      seeries: [
        {
          data: [13, 23, 20, 8, 13, 27, 44, 55, 41, 67, 22, 43, 41, 67, 22, 43],
        },
        {
          data: [44, 55, 41, 67, 22, 43, 41, 67, 22, 43, 13, 23, 20, 8, 13, 27],
        },
      ],
      colors: ['#02BC77', '#4791FF'],
      chart: {
        type: 'line',
        height: 280,
        stacked: true,
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'smooth',
        width: 2,
      },
      markers: {
        size: 5,
        colors: ['#02BC77', '#4791FF'],
        shape: 'circle',
        radius: 2,
        hover: {
          sizeOffset: 2,
        },
      },
      legend: {
        position: 'bottom',
        horizontalAlign: 'right',
      },
      fill: {
        opacity: 1,
      },
    };
    this.chartInventoryOptions = {
      series: [
        {
          data: [13, 23, 20, 8, 13, 27, 44, 55, 41, 67, 10, 13, 25, 9, 17, 17],
        },
        {
          data: [10, 13, 25, 9, 17, 17, 44, 15, 81, 67, 22, 43, 41, 67, 22, 43],
        },
        {
          data: [13, 23, 20, 8, 13, 27, 44, 55, 41, 67, 22, 43, 41, 67, 22, 43],
        },
        {
          data: [67, 22, 43, 41, 67, 22, 43, 55, 41, 67, 10, 13, 25, 9, 17, 17],
        },
      ],
      colors: ['#4791FF', '#FF2366', '#FFD950', '#02BC77'],
      chart: {
        type: 'bar',
        height: 280,
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'smooth',
        width: 2,
      },
      markers: {
        size: 0,
        strokeColor: '#fff',
        strokeWidth: 2,
        strokeOpacity: 1,
        fillOpacity: 1,
        hover: {
          size: 6,
        },
      },
      legend: {
        show: false,
      },
      fill: {
        opacity: 1,
      },
    };
  }

  onFilter(day) {
    this.usernameService.get(`date-uip/${day}`).subscribe((res) => {
      this.postCountOnDifferentDay.series = [
        {
          data: Array.from(res.post).map((el: any) => el.y),
        },
      ];
      (this.postCountOnDifferentDay.xaxis.categories = Array.from(res.post).map(
        (el: any) => new Date(el.x).toISOString().split('T')[0]
      )),
        (this.itemCountOnDifferentDay.series = [
          {
            data: Array.from(res.item).map((el: any) => el.y),
          },
        ]);
      this.itemCountOnDifferentDay.xaxis.categories = Array.from(res.item).map(
        (el: any) => new Date(el.x).toISOString().split('T')[0]
      );
      this.userCountOnDifferentDay.series = [
        {
          data: Array.from(res.user).map((el: any) => el.y),
        },
      ];
      this.userCountOnDifferentDay.xaxis.categories = Array.from(res.user).map(
        (el: any) => new Date(el.x).toISOString().split('T')[0]
      );
    });
  }

  // public generateDayWiseTimeSeries(baseval, count, yrange): any[] {
  //   let i = 0;
  //   let series = [];
  //   while (i < count) {
  //     var x = baseval;
  //     var y =
  //       Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;

  //     series.push([x, y]);
  //     baseval += 86400000;
  //     i++;
  //   }
  //   return series;
  // }
}
