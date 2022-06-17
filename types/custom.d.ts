import {NavItem} from '@vuepress/types'

declare interface Options {
    ignoreFolders: string[]
    ignoreFiles: string[]
    dirPrefix:string,
    filePrefix:string,
    showSideIcon:boolean,
    showNavIcon:boolean,
    isCollapsible:boolean,
    collapsed:boolean
}

declare const AutoNavPlugin: (options?: Options) => NavItem[];
