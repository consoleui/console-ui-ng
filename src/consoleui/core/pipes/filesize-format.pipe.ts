import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'cuiFilesizeFormat'
})
export class FilesizeFormatPipe implements PipeTransform {
    transform(value: any, ...args: any[]): any {
        if (typeof value != 'number') {
            return value;
        }

        let size = value;
        let units = 'B';
        if (size / 1024 > 1) {
            size = size / 1024;
            units = 'KB';
        }
        if (size / 1024 > 1) {
            size = size / 1024;
            units = 'MB';
        }
        if (size / 1024 > 1) {
            size = size / 1024;
            units = 'GB';
        }
        if (size / 1024 > 1) {
            size = size / 1024;
            units = 'TB';
        }

        return size.toFixed(2) + units;
    }
}
