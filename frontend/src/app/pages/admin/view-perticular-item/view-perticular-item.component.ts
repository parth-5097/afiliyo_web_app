import { Component, OnInit, ViewChild } from '@angular/core';
import { SlickCarouselComponent } from 'ngx-slick-carousel';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-view-perticular-item',
  templateUrl: './view-perticular-item.component.html',
  styleUrls: ['./view-perticular-item.component.css'],
})
export class ViewPerticularItemComponent implements OnInit {
  @ViewChild('slickModal') slickModal!: SlickCarouselComponent;
  slideConfig = { slidesToShow: 5, slidesToScroll: 1 };
  data: any = {};
  images: any[] = [];
  readonly baseUrl = environment.PORT_URL;

  constructor() {}

  ngOnInit(): void {
    history.state.item_id
      ? localStorage.setItem('itemData', JSON.stringify(history.state))
      : '';
    this.data = JSON.parse(localStorage.getItem('itemData'));
    this.images = this.data.image
      .split(',')
      .map((el) => (el.startsWith('http') ? el : this.baseUrl + el));
  }
}
