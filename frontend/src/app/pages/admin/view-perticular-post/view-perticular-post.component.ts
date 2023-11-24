import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SlickCarouselComponent } from 'ngx-slick-carousel';
import { ToastrService } from 'ngx-toastr';
import { UsernameService } from 'src/app/service/username.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-view-perticular-post',
  templateUrl: './view-perticular-post.component.html',
  styleUrls: ['./view-perticular-post.component.css'],
})
export class ViewPerticularPostComponent implements OnInit {
  @ViewChild('slickModal') slickModal!: SlickCarouselComponent;
  slideConfig = { slidesToShow: 5, slidesToScroll: 1 };
  data: any = {};
  images: any[] = [];
  readonly baseUrl = environment.PORT_URL;

  constructor(
    private usernameService: UsernameService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    history.state.id
      ? localStorage.setItem('postData', JSON.stringify(history.state))
      : '';
    this.data = JSON.parse(localStorage.getItem('postData'));
    this.images = this.data.image.split(',');
  }

  onDelete() {
    this.usernameService.delete(`post/${this.data.id}`).subscribe((res) => {
      this.toastr.success(res.message);
      this.router.navigate(['/admin/post']);
    });
  }
}
