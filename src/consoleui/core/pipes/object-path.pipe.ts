import { Pipe, PipeTransform } from '@angular/core';

import * as ObjectPath from 'object-path';

@Pipe({
  name: 'objectPath'
})
export class ObjectPathPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if ('function' == typeof args[0] ) {
      return args[0](value);
    }

    return ObjectPath.get(value, args, '');
  }

}
