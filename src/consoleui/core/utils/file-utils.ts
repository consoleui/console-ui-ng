export type FileType = 'IMAGE' | 'DOC' | 'AUDIO' | 'VEDIO' | 'ZIP' | 'TEXT' | 'UNKOWN';

export class FileUtils {

    public static getExpandedName(file: File | string): string {
        let fileName = '';
        if (file instanceof File) {
            fileName = file.name;
        } else {
            fileName = file;
        }

        if (fileName.includes('\\') || fileName.includes('/')) {
            fileName = fileName.substring(fileName.lastIndexOf('\\') + 1).substring(fileName.lastIndexOf('/') + 1);
        }

        if (fileName && fileName.indexOf('.') > 0) {
            return fileName.substring(fileName.lastIndexOf('.') + 1);
        }
        return null;
    }

    public static getFileType(file): FileType {
        let _type: FileType = 'UNKOWN';

        if (FileUtils.isImage(file)) {
            return 'IMAGE';
        }

        if (FileUtils.isAudio(file)) {
            return 'AUDIO';
        }

        if (FileUtils.isVedio(file)) {
            return 'VEDIO';
        }

        return _type;
    }

    public static isImage(file: File): boolean {
        return /^image\//.test(file.type);
    }

    public static isAudio(file: File): boolean {
        return /^audio\//.test(file.type);
    }

    public static isVedio(file: File): boolean {
        return /^vedio\//.test(file.type);
    }
}
