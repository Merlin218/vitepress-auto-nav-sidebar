import { getOptions } from './defaultConfig';
import FileHelper from './utils/fileHelper'

const options = getOptions();

export function getFilterCurFolder(path: string) {
  return FileHelper.getCurDirs(path).sort()
    .filter((item => !options.ignoreFolders?.includes(FileHelper.getDirNameByPath(item))));
}

export function getFilterCurMDFile(path: string) {
  return FileHelper.getMdFiles(path).sort()
    .filter((item => !options.ignoreFiles?.includes(FileHelper.getFileNameByPath(item))));
}

export function formatText(text: string, target: 'nav' | 'sidebar', type: 'dir' | 'file') {
  if (target === 'nav') {
    return options.showNavIcon ? `${options[`${type}Prefix`]}${text}` : text;
  }
  return options.showSideIcon ? `${options[`${type}Prefix`]}${text}` : text;
}
