import { Directive, OnChanges, Input, SimpleChanges } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl, Validators } from '@angular/forms';
import { ComplexValidators } from './complex-validators';

@Directive({
    selector: '[forbidden]',
    providers: [{ provide: NG_VALIDATORS, useExisting: ForbiddenValidatorDirective, multi: true }]
})
export class ForbiddenValidatorDirective implements Validator, OnChanges {
    @Input() forbidden: string;
    private valFn = Validators.nullValidator;

    ngOnChanges(changes: SimpleChanges): void {
        const change = changes['forbidden'];
        if (change) {
            const val: string | RegExp = change.currentValue;
            const re = val instanceof RegExp ? val : new RegExp(val, 'i');
            this.valFn = ComplexValidators.forbiddenValidator(re);
        } else {
            this.valFn = Validators.nullValidator;
        }
    }

    validate(control: AbstractControl): { [key: string]: any } {
        return this.valFn(control);
    }
}
