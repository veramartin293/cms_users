import { Pipe, PipeTransform } from "@angular/core";

@Pipe({name: 'search'})

export class SearchPipe implements PipeTransform {
  transform(users: any, text: string): any[] {
    if (!users) {
      return [];
    }
    if (!text) {
      return users;
    }

    text = text.toLocaleLowerCase();
    return users.filter((user: any) => {
      const fullName = user.firstName.toLocaleLowerCase() + ' ' + user.lastName.toLocaleLowerCase();
      return fullName.includes(text);
    })
  }
}
