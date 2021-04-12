import {Component, OnInit, OnDestroy, ViewChild} from '@angular/core';
import { UsersService } from '../../services/users/users.service';
import {Subject} from 'rxjs';
import {DataTableDirective} from 'angular-datatables';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, OnDestroy {

  allUsers: any = [];

  @ViewChild(DataTableDirective, {static: false})
  datatableElement: any = DataTableDirective;
  min: any = 0;
  max: any = 0;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private service: UsersService) { }

  ngOnInit(): void {
    $.fn.dataTable.ext.search.push((settings: any, data: string[], dataIndex: any) => {
      const id = parseFloat(data[0]) || 0; // use data for the id column
      return (Number.isNaN(this.min) && Number.isNaN(this.max)) ||
          (Number.isNaN(this.min) && id <= this.max) ||
          (this.min <= id && Number.isNaN(this.max)) ||
          (this.min <= id && id <= this.max);
    });

    this.users();
  }

  users(): void {
    this.service
        .users()
        .subscribe((response: any) => {
          this.allUsers = response;
          this.dtTrigger.next();
        });
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();

    $.fn.dataTable.ext.search.pop();
  }

  filterById(): void {
    this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.draw();
    });
  }
}
