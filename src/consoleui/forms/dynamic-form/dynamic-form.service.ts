import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { BaseField } from './base-field';

@Injectable()
export class DynamicFormService {

    constructor() { }

    toFormGroup(fields: BaseField<any>[]) {
        let group: any = {};

        fields.forEach(field => {
            group[field.key] = field.required ? new FormControl(field.value || '', Validators.required)
                    : new FormControl(field.value || '');
        });
        return new FormGroup(group);
    }
}
