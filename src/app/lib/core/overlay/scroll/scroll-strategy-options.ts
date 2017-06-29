import { Injectable } from '@angular/core';
import { ScrollDispatcher } from './scroll-dispatcher';

@Injectable()
export class ScrollStrategyOptions {
    constructor(
        private _scrollDispatcher: ScrollDispatcher,
    ) {}
}
