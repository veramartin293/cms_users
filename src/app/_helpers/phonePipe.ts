import { Pipe, PipeTransform } from "@angular/core";
import { formatPhoneNumber  } from './utilities';

@Pipe({name: 'phone'})

export class PhonePipe implements PipeTransform {
  transform(phone: string) {
    return formatPhoneNumber(phone);
  }
}
