import { Pipe, PipeTransform } from '@angular/core';
import { Modal } from '../models/types/Modal.type';

@Pipe({
  name: 'hasProperties'
})
export class HasPropertiesPipe implements PipeTransform {

  transform(object: Object): boolean {
    return Object.entries(object).length > 0;
  }

}
