import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UsersService } from '../users.service';
import { User } from '../_models/user.model';

@Component({
  selector: 'app-userform',
  templateUrl: './userform.component.html',
  styleUrls: ['./userform.component.scss'],
})
export class UserformComponent implements OnInit {

  @Input() formMode: string;
  @Input() user: User;
  @Output() onClosingForm: EventEmitter<void>;
  @Output() operationCompleted: EventEmitter<object>;
  @Output() userAdded: EventEmitter<User>;

  formTitle: string;
  formAction: string;
  previousUser: User;

  constructor(private userService: UsersService) {
    this.user = {
      id: 0,
      firstName: '',
      lastName: '',
      location: '',
      phone: '',
      gender: 'm'
    };
    this.previousUser = {...this.user};

    this.onClosingForm = new EventEmitter();
    this.formTitle = '';
    this.formAction = '';
    this.formMode = '';
    this.operationCompleted = new EventEmitter();
    this.userAdded = new EventEmitter();
  }

  ngOnInit(): void {
    this.formTitle = this.user.id === 0 ? 'Agregar Usuario' : 'Editar Usuario';
    this.formAction = this.user.id === 0 ? 'Agregar' : 'Guardar';
    this.formMode = this.user.id === 0 ? 'add' : 'edit';
    // this.user.phone = formatPhoneNumber(this.user.phone);
    this.previousUser = { ...this.user }; // Create a clone of user (for canceling editing)
  }

  closeForm() {
    this.onClosingForm.emit();
  }

  cancelForm() {
    if (this.formMode === 'edit') {
      this.setUserToPreviousUser();
    }
    this.closeForm();
  }

  onUserAdded() {
    this.userAdded.emit(this.user)
  }

  addUser() {
    this.userService.addUser(this.user)
    .subscribe(
      (response) => {
        this.operationCompleted.emit({
          status: true,
          message: 'Usuario agregado'
        });
        this.user.id = response.id;
        this.userAdded.emit(this.user);
        this.closeForm();
      },
      error => {
        this.operationCompleted.emit({
          status: false,
          message: 'Error al agregar'
        })
        console.log(error);
        this.closeForm();
      }
    );
  }

  editUser() {
    this.userService.editUser(this.user)
    .subscribe(
      () => {
        this.operationCompleted.emit({
          status: true,
          message: 'Usuario actualizado'
        });
        this.closeForm();
      },
      error => {
        this.operationCompleted.emit({
          status: false,
          message: 'Error al actualizar'
        });
        this.setUserToPreviousUser();
        console.log(error);
        this.closeForm();
      }
    );
  }

  private setUserToPreviousUser() {
    this.user.firstName = this.previousUser.firstName;
    this.user.lastName = this.previousUser.lastName;
    this.user.location = this.previousUser.location;
    this.user.phone = this.previousUser.phone;
    this.user.gender = this.previousUser.gender;
  }

  // Stop even propagation on form click
  formClick(event: Event): void {
    event.stopPropagation();
  }

}
