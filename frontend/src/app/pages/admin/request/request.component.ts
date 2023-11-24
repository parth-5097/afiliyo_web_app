import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { ExportService } from 'src/app/service/export.service';
import { UsernameService } from 'src/app/service/username.service';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css'],
})
export class RequestComponent implements OnInit {
  @ViewChild(DataTableDirective, { static: false })
  datatableElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  data: any[] = [];

  constructor(
    private usernameService: UsernameService,
    private exportService: ExportService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'simple_numbers',
      pageLength: 10,
      paging: true,
      destroy: true,
      scrollX: true,
      scrollY: '50vh',
      language: {
        paginate: {
          next: '<i class="fa fa-angle-double-right"></i>',
          previous: '<i class="fa fa-angle-double-left"></i>',
          first: '<i class="fa fa-angle-double-right"></i>',
          last: '<i class="fa fa-angle-double-left"></i>',
        },
      },
    };

    this.getDbData().then((data) => {
      this.dtTrigger.next();
    });
  }

  getDbData() {
    return new Promise((resolve, reject) => {
      this.data = [];
      this.usernameService.get('role').subscribe((res) => {
        this.data = res.data;
        console.log(res.data);
        resolve(res);
      });
    });
  }

  ReloadDatatable() {
    this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
      this.getDbData().then((data) => {
        this.dtTrigger.next();
      });
    });
  }

  rerender(): void {
    this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
      this.dtTrigger.next();
    });
  }

  onExport() {
    var jsonData = this.data;
    this.exportService.exportToCsv(jsonData, `${Date()}`);
    this.toastr.info('Exported');
  }

  onDelete(id: any) {
    this.usernameService.delete(`role/${id}`).subscribe((res) => {
      this.toastr.success(res.message);
      this.getDbData().then((data) => {
        this.dtTrigger.next();
      });
    });
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
}
