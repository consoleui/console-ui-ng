
import { InjectionToken } from '@angular/core';

export interface DataTableConfig {
    showSerialNumber?: boolean;
    serialNumberLabel?: string;
}

export interface FileUploadConfig {
    basePath?: string;
}

export interface CuiRootConfig {
    dataTable?: DataTableConfig;
    fileUpload?: FileUploadConfig;
}

export const CUI_ROOT_CONFIG = new InjectionToken<CuiRootConfig>('CuiRootConfig');

