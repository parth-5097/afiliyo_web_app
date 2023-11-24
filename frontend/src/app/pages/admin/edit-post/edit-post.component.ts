import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SlickCarouselComponent } from 'ngx-slick-carousel';
import { ToastrService } from 'ngx-toastr';
import { CommonRouteService } from 'src/app/service/common-route.service';
import { UsernameService } from 'src/app/service/username.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css'],
})
export class EditPostComponent implements OnInit {
  @ViewChild('slickModal') slickModal!: SlickCarouselComponent;
  slideConfig = { slidesToShow: 5, slidesToScroll: 1 };
  images: any[] = [];
  items: any[] = [];
  data: any = {};
  country: any[] = [];
  submit: any = false;
  readonly baseUrl = environment.PORT_URL;

  constructor(
    private usernameService: UsernameService,
    private commonService: CommonRouteService,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data) => {
      this.usernameService.get(`post/${data.id}`).subscribe((res) => {
        this.data = res.data[0];
        this.images = this.data.image.split(',');
        this.items = JSON.parse(this.data.items);
      });
    });

    this.commonService.get('country').subscribe((res) => {
      this.country = res.data;
    });
  }

  onSubmit() {
    this.submit = true;
    this.usernameService
      .put(`user/${this.data.user_id}`, { name: this.data.name })
      .subscribe((res) => {
        this.usernameService
          .put(`post/${this.data.id}`, {
            likes: this.data.likes,
            share: this.data.share,
            commentPost: this.data.commentPost,
            savePost: this.data.savePost,
            items: this.data.items,
            description: this.data.description,
            hashtag: this.data.hashtag,
            tagBrand: this.data.tagBrand,
          })
          .subscribe((res) => {
            this.submit = false;
            this.toastr.success(res.message);
          });
      });
  }
}
