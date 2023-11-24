import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-afilio-apply-footer',
  templateUrl: './afilio-apply-footer.component.html',
  styleUrls: ['./afilio-apply-footer.component.css'],
})
export class AfilioApplyFooterComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  onRedirect(val) {
    this.router.navigateByUrl(`#${val}`);
  }
  
}
