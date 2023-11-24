import { Component, OnInit } from '@angular/core';
import { UsernameService } from 'src/app/service/username.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  data: any;
  readonly baseUrl = environment.PORT_URL;

  constructor(private usernameService: UsernameService) {}

  ngOnInit(): void {
    this.usernameService.get('profile').subscribe((res) => {
      res.data.background_img = this.baseUrl + res.data.background_img;
      res.data.profile_pic_img = this.baseUrl + res.data.profile_pic_img;
      this.data = res.data;
    });
  }
}
