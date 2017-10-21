import { BaseField } from './base-field';

export class DropdownField extends BaseField<string> {
    controlType = 'dropdown';
    options: {key: string, value: string}[] = [];

    constructor(options: {} = {}) {
        super(options);
        this.options = options['options'] || [];
    }
}
