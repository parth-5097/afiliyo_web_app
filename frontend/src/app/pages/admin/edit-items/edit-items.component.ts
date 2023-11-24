import { Component, OnInit, ViewChild } from '@angular/core';
import { SlickCarouselComponent } from 'ngx-slick-carousel';
import { ToastrService } from 'ngx-toastr';
import { UsernameService } from 'src/app/service/username.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-edit-items',
  templateUrl: './edit-items.component.html',
  styleUrls: ['./edit-items.component.css'],
})
export class EditItemsComponent implements OnInit {
  @ViewChild('slickModal') slickModal!: SlickCarouselComponent;
  slideConfig = { slidesToShow: 5, slidesToScroll: 1 };
  data: any = {};
  images: any[] = [];
  submit: any = false;
  readonly baseUrl = environment.PORT_URL;

  constructor(
    private usernameService: UsernameService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    history.state.item_id
      ? localStorage.setItem('itemData', JSON.stringify(history.state))
      : '';
    this.data = JSON.parse(localStorage.getItem('itemData'));
    this.images = this.data.image
      .split(',')
      .map((el) => (el.startsWith('http') ? el : this.baseUrl + el));
  }

  onSubmit() {
    this.submit = true;
    Promise.all([
      new Promise((resolve, reject) => {
        this.usernameService
          .put(`category/${this.data.category_id}`, {
            name: this.data.category_name,
          })
          .subscribe((res) => resolve(res));
      }),
      new Promise((resolve, reject) => {
        this.usernameService
          .put(`brand/${this.data.brand_id}`, {
            name: this.data.brand_name,
          })
          .subscribe((res) => resolve(res));
      }),
      this.data.color_id
        ? new Promise((resolve, reject) => {
            this.usernameService
              .put(`color/${this.data.color_id}`, {
                name: this.data.color_name,
              })
              .subscribe((res) => resolve(res));
          })
        : ``,
      this.data.size_id
        ? new Promise((resolve, reject) => {
            this.usernameService
              .put(`size/${this.data.size_id}`, {
                name: this.data.size_name,
              })
              .subscribe((res) => resolve(res));
          })
        : ``,
      new Promise((resolve, reject) => {
        this.usernameService
          .put(`item/${this.data.item_id}`, {
            name: this.data.item_name,
            gender: this.data.gender,
            description: this.data.description,
            price: this.data.price,
          })
          .subscribe((res) => resolve(res));
      }),
    ])
      .then((res) => {
        this.submit = false;
        this.toastr.success('Item updated successfully');
      })
      .catch((err) => {
        this.toastr.error(`Something went wrong`);
      });
  }
}
