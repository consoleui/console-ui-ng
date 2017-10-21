import { Directive, forwardRef, Attribute, Input } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';

@Directive({
    selector: '[validateEqual][formControlName],[validateEqual][formControl],[validateEqual][ngModel]',
    providers: [
        { provide: NG_VALIDATORS, useExisting: forwardRef(() => EqualValidatorDirective), multi: true }
    ]
})
export class EqualValidatorDirective implements Validator {
    @Input('validateEqual') public validateEqual: string | AbstractControl;

    constructor(
        // @Attribute('validateEqual') public validateEqual: string | AbstractControl,
        @Attribute('reverse') public reverse: string) {
    }

    private get isReverse() {
        if (!this.reverse) {
            return false;
        }
        return this.reverse === 'true' ? true : false;
    }

    validate(c: AbstractControl): { [key: string]: any } {
        // self value
        let v = c.value;

        if (!this.validateEqual) {
            return null;
        }

        // control vlaue
        let e: AbstractControl;
        if (typeof this.validateEqual === 'string') {
            e = c.root.get(this.validateEqual);
        } else {
            e = this.validateEqual;
        }
        if (!e) {
            return null;
        }

        if (this.isReverse) {
            if (e && v === e.value) {
                delete e.errors['validateEqual'];
                if (!Object.keys(e.errors).length) {
                    e.setErrors(null);
                }
            } else {
                e.setErrors({validateEqual: v})
            }
        } else {
            if (e.value && e.value.length > 0) {
                if (e && v !== e.value) {
                    return { validateEqual: v };
                }
            }
        }

        // value not equal
        // if (e && v !== e.value && !this.isReverse) {
        //     return {
        //         // validateEqual: false
        //         validateEqual: v
        //     }
        // }

        // value equal and reverse
        // if (e && v === e.value && this.isReverse) {
        //     if (e.errors && e.errors['validateEqual']) {
        //         delete e.errors['validateEqual'];
        //     }
        //     /*if (!Object.keys(e.errors).length) {
        //         e.setErrors(null);
        //     }*/
        // }

        // value not equal and reverse
        // if (e && v !== e.value && this.isReverse) {
        //     // e.setErrors({ validateEqual: false });
        //     return {validateEqual: v};
        // }

        return null;
    }
}
