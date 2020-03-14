import { defaultImage } from './default-image-code';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import { Directive, Input, OnInit, ElementRef } from '@angular/core';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';

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

        // return this.http.get(this.src).map((resp) => {
        //     return true;
        // }).catch((resp) => {
        //     return Observable.of(false);
        // });
        const img = new Image();
        img.src = this.src;
        if (img.naturalWidth > 0 && img.naturalHeight > 0) {
            return Observable.of(true);
        }
        return Observable.of(false);
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
