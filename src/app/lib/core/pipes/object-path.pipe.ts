import { Pipe, PipeTransform } from '@angular/core';

import * as ObjectPath from 'object-path';

@Pipe({
  name: 'objectPath'
})
export class ObjectPathPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return ObjectPath.get(value, args, '');
  }

}
