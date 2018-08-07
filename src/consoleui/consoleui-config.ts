
import { InjectionToken } from '@angular/core';

export interface DataTableConfig {
    showSerialNumber?: boolean;
    serialNumberLabel?: string;
}

export interface CuiRootConfig {
    dataTable?: DataTableConfig;
}

export const CUI_ROOT_CONFIG = new InjectionToken<CuiRootConfig>('CuiRootConfig');

