import { Injectable } from '@angular/core';
import { User } from './_models/user.model';
// For HTTP client
import { HttpClient } from '@angular/common/http';
import { Observable, throwError  } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  // private users: User[] = [
  //   {
  //     id: 1,
  //     name: 'Juan',
  //     lastname: 'Perez',
  //     location: 'Juárez, Chih',
  //     phone: '6562345096',
  //     gender: 'H'
  //   },
  //   {
  //     id: 2,
  //     name: 'Maria',
  //     lastname: 'Lopez',
  //     location: 'Juárez, Chih',
  //     phone: '6564596095',
  //     gender: 'M'
  //   },
  //   {
  //     id: 3,
  //     name: 'Andrea',
  //     lastname: 'Vera',
  //     location: 'Chih, Chih',
  //     phone: '6567485960',
  //     gender: 'M'
  //   },
  //   {
  //     id: 4,
  //     name: 'Roberto',
  //     lastname: 'Soto',
  //     location: 'Chih, Chih',
  //     phone: '6564758889',
  //     gender: 'H'
  //   },
  //   {
  //     id: 5,
  //     name: 'Karen',
  //     lastname: 'Ramirez',
  //     location: 'Chih, Chih',
  //     phone: '6567849584',
  //     gender: 'M'
  //   }
  // ];

  private url: string;

  constructor(private http: HttpClient) {
    this.url = 'http://iacenter.victortalamantes.com';
   }

  getAll() : Observable<User[]> {
    const responseObs = this.http.get<User[]>(this.url + '/users');
    return responseObs;
  }

  addUser(user: User): Observable<User> {
    const responseObs = this.http.post<User>(this.url + '/user', user);
    return responseObs;
  }

  editUser(user: User): Observable<User> {
    const responseObs = this.http.put<User>(this.url + '/user', user);
    return responseObs;
  }
}
