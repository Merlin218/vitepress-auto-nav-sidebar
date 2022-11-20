import { DefaultTheme } from 'vitepress/types/default-theme';
declare const getNav: (options: Required<{
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
}> | undefined, path: string) => DefaultTheme.NavItem[];
export { getNav };
