import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { User } from '../_models/user.model';

import { trigger, style, animate, transition, query } from '@angular/animations';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  animations: [
    trigger('notiAnimation', [
      transition('void => *', [
        style({ top: '-4rem' }),
        animate('300ms', style({
          top: '0'
        }))
      ]),
      transition('* => void', [
        style({ top: 0 }),
        animate('300ms', style({
          top: '-4rem'
        }))
      ])
    ]),
    trigger('formAnimation', [
      transition('void => *', [
        query('.modal-container, .user', [
          style({ opacity: '0', transform: 'scale(0.4)' }),
          animate('250ms', style({
            opacity: '1',
            transform: 'scale(1)'
          }))
        ], {optional: true})
      ]),
      transition('* => void', [
        query('.modal-container, .user', [
          style({ opacity: '1', transform: 'scale(1)' }),
          animate('250ms', style({
            opacity: '0',
            transform: 'scale(0.4)'
          }))
        ], {optional: true})
      ]),
    ]),
  ]
})
export class UsersComponent implements OnInit {

  users: User[];
  userToModify: User;
  showModal: boolean;
  notification: any;
  searchText: string;

  constructor(private usersService: UsersService) {
    this.users = [];
    this.showModal = false;
    this.userToModify = {
      id: 0,
      firstName: '',
      lastName: '',
      location: '',
      phone: '',
      gender: 'H',
    };
    this.notification = {
      status: false,
      message: ''
    };
    this.searchText = '';
  }

  ngOnInit(): void {
    this.usersService.getAll()
    .subscribe(
      (data: User[]) => {
        this.users = data.reverse();
      },
      error => {
        console.log('There was an error on the server');
        console.log(error);
      }
    );
  }

  addUser(user: User) {
    this.userToModify = user;
    this.showModal = true;
  }

  onUserAdded(user: User) {
    this.users.unshift(user);
    window.scrollTo({
      top: 0,
    });
  }

  modifyUser(user: User) {
    this.userToModify = user;
    this.showModal = true;
  }

  displayNotificaction(notification:object) {
    this.notification = notification;
    setTimeout(() => {
      this.notification = '';
    }, 1800);
  }

}
