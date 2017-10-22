import { defaultImage } from './default-image-code';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import { Directive, Input, OnInit, ElementRef } from '@angular/core';

import 'rxjs/operator/map';
import 'rxjs/operator/catch';

import 'rxjs/observable/of';
import 'rxjs/operator/do';

@Directive({ selector: 'img[cui-lazy-load]' })
export class ImageLazyLoadDirective implements OnInit {
    @Input() src: string;

    constructor(private el: ElementRef, private http: Http) { }

    ngOnInit() {
        this.checkValid().subscribe(
            (ok) => {
                if (ok) {
                    this.setImage();
                } else {
                    this.setErrClass();
                }
            },
            (err) => {
                this.setErrClass();
            }
        );
    }

    checkValid(): Observable<boolean> {
        if (!this.src) {
            return Observable.of(false);
        }

        return this.http.get(this.src).map((resp) => {
            return true;
        }).catch((resp) => {
            return Observable.of(false);
        });
    }

    setImage() {
        let imgTag: Element = this.el.nativeElement;
        imgTag.setAttribute('src', this.src);
    }

    setErrClass() {
        let imgTag: Element = this.el.nativeElement;
        let errorClassName = 'error';
        if (!this.hasClassName(imgTag, errorClassName)) {
            imgTag.className = imgTag.className ? [imgTag.className, errorClassName].join(' ') : errorClassName;
        }

        imgTag.setAttribute('src', defaultImage);
    }

    hasClassName(el: Element, name) {
        return new RegExp('(?:^|\\s+)' + name + '(?:\\s+|$)').test(el.className);
    }
}
