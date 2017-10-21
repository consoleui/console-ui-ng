import { BaseField } from './base-field';

export class TextField extends BaseField<string> {
    controlType = 'text';
    type: string;

    constructor(options: {} = {}) {
        super(options);
        this.type = options['type'] || '';
    }
}
