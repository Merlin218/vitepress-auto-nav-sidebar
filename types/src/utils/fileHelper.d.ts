export declare const isREADME: (filename: string) => boolean;
declare const _default: {
    getCurFiles: (dir: string, SuffixIncludes?: string[], unFileIncludes?: string[]) => string[];
    getAllDirs: (dir?: string, unDirIncludes?: string[]) => string[];
    getCurDirs: (dir?: string) => string[];
    hasSubDirs: (path: string) => boolean;
    getMdFiles: (path: string, prefix?: string, options?: Required<{
        entry?: string | undefined;
        ignoreFolders?: string[] | undefined;
        ignoreFiles?: string[] | undefined;
        dirPrefix?: string | undefined;
        filePrefix?: string | undefined;
        showSideIcon?: boolean | undefined;
        showNavIcon?: boolean | undefined;
        isCollapsible?: boolean | undefined;
        collapsed?: boolean | undefined;
        singleLayerNav?: boolean | undefined;
        customParentFolderName?: string | undefined;
        hiddenFilePrefix?: string | undefined;
    }> | undefined) => string[];
    getFileNameByPath: (dir: string) => string;
    getDirNameByPath: (dir: string) => string;
    hasREADME: (path: string) => boolean;
};
export default _default;
