import { Component, OnInit, OnDestroy } from '@angular/core';
import { UsersService } from '../../services/users/users.service';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, OnDestroy {

  allUsers: any = [];

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private service: UsersService) { }

  ngOnInit(): void {
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
  }

}
