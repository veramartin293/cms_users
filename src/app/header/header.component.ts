import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { User } from '../_models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() onAddingUser: EventEmitter<User>;

  constructor() {
    this.onAddingUser = new EventEmitter();
  }

  ngOnInit(): void {
  }

  addUser(): void {
    this.onAddingUser.emit({
      id: 0,
      firstName: '',
      lastName: '',
      phone: '',
      location: '',
      gender: 'm'
    });
  }

}
