import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CommonRouteService } from 'src/app/service/common-route.service';

@Component({
  selector: 'app-career-apply',
  templateUrl: './career-apply.component.html',
  styleUrls: ['./career-apply.component.css'],
})
export class CareerApplyComponent implements OnInit {
  careerForm: FormGroup;
  submitted = false;
  submit = false;
  imageUrl: any;
  imageName: string = 'Upload File';

  constructor(
    private formBuilder: FormBuilder,
    private commonService: CommonRouteService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.careerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/),
        ],
      ],
      contactno: [
        '',
        [Validators.required, Validators.pattern(/^(?:[0-9] ?){9}[0-9]$/)],
      ],
      subject: ['', Validators.required],
      message: ['', Validators.required],
    });
  }

  get f() {
    return this.careerForm.controls;
  }

  onChangeImage() {
    const fileInput = document.getElementById('real-file');
    fileInput.click();
  }

  handleImageChange($event) {
    var image = $event.target.files[0];
    var formData = new FormData();
    formData.append('file', image, image.name);
    this.commonService.post('formimg', formData).subscribe((res) => {
      this.imageName = image.name;
      this.imageUrl = res.data;
      this.toastr.info('File has been uploaded');
    });
  }

  onSubmit() {
    this.submitted = true;

    if (this.careerForm.invalid) {
      return;
    } else {
      this.submit = true;
      this.careerForm.value.page = 'career';
      this.careerForm.value.imageUrl = this.imageUrl;
      this.commonService
        .post('form', this.careerForm.value)
        .subscribe((res) => {
          this.submitted = false;
          this.submit = false;
          this.careerForm.reset();
          this.imageName = 'Upload File';
          this.toastr.success(res.message);
        });
    }
  }
}
