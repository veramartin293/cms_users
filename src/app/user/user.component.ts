import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from '../_models/user.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {

  @Input() user: User;
  @Output() onEditingUser: EventEmitter<User>;

  constructor() {
    this.user = {
      id: 0,
      firstName: '',
      lastName: '',
      location: '',
      phone: '',
      gender: ''
    };
    this.onEditingUser = new EventEmitter();
  }

  ngOnInit(): void {
  }

  editUser() {
    this.onEditingUser.emit(this.user);
  }

}
