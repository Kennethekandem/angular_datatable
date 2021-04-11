import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users/users.service';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  allUsers: any = [];

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private service: UsersService) { }

  ngOnInit(): void {
    this.users();
  }

  users() {
    this.service
        .users()
        .subscribe((response: any) => {
          this.allUsers = response;
          console.log(this.allUsers);
        });
  }

}
