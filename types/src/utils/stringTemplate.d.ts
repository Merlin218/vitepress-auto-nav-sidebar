declare type FolderConfig = {
    title: string;
    link?: string;
    items: (string | FolderConfig)[];
};
declare type FolderConfigs = FolderConfig[];
declare type FileConfig = string;
declare type FileConfigs = FileConfig[];
declare const _default: {
    READMETemplate: (config: {
        files: FileConfigs;
        folders: FolderConfigs;
    }, title: string) => string;
};
export default _default;
