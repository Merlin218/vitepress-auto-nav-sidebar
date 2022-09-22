import { NavItem } from '@vuepress/types'

declare interface Options {
    entry?: string,
    ignoreFolders?: string[]
    ignoreFiles?: string[]
    dirPrefix?: string,
    filePrefix?: string,
    showSideIcon?: boolean,
    showNavIcon?: boolean,
    isCollapsible?: boolean,
    collapsed?: boolean,
    singleLayerNav?: boolean,
    customParentFolderName?: string
}

declare const AutoNavPlugin: (options?: Options) => NavItem[];
