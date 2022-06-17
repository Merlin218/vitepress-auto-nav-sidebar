declare const _default: {
    getCurFiles: (dir: string, SuffixIncludes?: string[], unFileIncludes?: string[]) => string[];
    getAllDirs: (dir: string | undefined, unDirIncludes: string[]) => string[];
    getCurDirs: (dir?: string) => string[];
    createREADME: (dir: string) => void;
    hasSubDirs: (path: string) => boolean;
    getMdFiles: (path: string, prefix?: string) => string[];
    getFileNameByPath: (dir: string) => string;
    getDirNameByPath: (dir: string) => string;
    hasIndexMd: (path: string) => boolean;
};
export default _default;
