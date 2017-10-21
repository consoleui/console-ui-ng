import { AbstractControl, ValidatorFn } from '@angular/forms';

export class ComplexValidators {

    /** A value of control can't match the given regular expression */
    static forbiddenValidator(nameRe: RegExp): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } => {
            const name = control.value;
            const no = nameRe.test(name);
            return no ? { 'forbidden': { name } } : null;
        };
    }


}
