import { FilesizeFormatPipe } from './pipes/filesize-format.pipe';
import { ImageLazyLoadDirective } from './directives/image-lazy-load.directive';
import { NgModule } from '@angular/core';
import { ObjectPathPipe } from './pipes/object-path.pipe';
import { DomHandler } from './dom/dom-handler';

const DIRECTIVES = [
    ImageLazyLoadDirective
];

const PIPES = [
    ObjectPathPipe,
    FilesizeFormatPipe
];

@NgModule({
    imports: [],
    exports: [...DIRECTIVES, ...PIPES],
    declarations: [...DIRECTIVES, ...PIPES],
    providers: [DomHandler],
})
export class CuiCoreModule { }
