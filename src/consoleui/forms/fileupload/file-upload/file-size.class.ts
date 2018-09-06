export class FileSize {
  public static prettySize(value: any, decimal = 2): any {
    if (typeof value != 'number') {
        return value;
    }

    let size = value;
    let units = 'B';
    if (size / 1024 >= 1) {
        size = size / 1024;
        units = 'KB';
    }
    if (size / 1024 >= 1) {
        size = size / 1024;
        units = 'MB';
    }
    if (size / 1024 >= 1) {
        size = size / 1024;
        units = 'GB';
    }
    if (size / 1024 >= 1) {
        size = size / 1024;
        units = 'TB';
    }

    return size.toFixed(decimal) + units;
}
}
