import { Options } from '../types/custom';
export declare function getFilterCurFolder(options: Options, path: string): string[];
export declare function getFilterCurMDFile(options: Options, path: string): string[];
export declare function formatText(options: Options, text: string, target: 'nav' | 'sidebar', type: 'dir' | 'file'): string;
