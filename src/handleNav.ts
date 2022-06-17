
import { DefaultTheme } from 'vitepress/types/default-theme'
import FileHelper from './utils/fileHelper'
import { getOptions } from './defaultConfig';
/**
 * @description: 获取导航配置项
 * @param {string} path 目录路径
 * @param {number} depth 目录深度
 * @param {string} prefix 父级前缀
 * @return {*} 返回nav配置
 */
const getNav = (path: string): DefaultTheme.NavItem[] => {
  const options = getOptions();
  const arr: DefaultTheme.NavItem[] = []
  FileHelper.getCurDirs(path).sort()
    .filter((item => !options.ignoreFolders.includes(FileHelper.getDirNameByPath(item))))
    .forEach((dir: string) => {
      const text = FileHelper.getDirNameByPath(dir);
      const subFolders = FileHelper.getCurDirs(dir);
      const folderItems = subFolders.map((subFolderPath) => {
        const subFolderText = FileHelper.getDirNameByPath(subFolderPath);
        const firstFile = FileHelper.getMdFiles(subFolderPath)[0]
        return {
          text: options.showNavIcon ? `${options.dirPrefix}${subFolderText}` : subFolderText,
          link: '/' + text + '/' + subFolderText + '/' + firstFile ?? FileHelper.getFileNameByPath(firstFile) ?? ''
        }
      })
      const subFiles = FileHelper.getMdFiles(dir).map(item => FileHelper.getFileNameByPath(item));
      const fileItems = subFiles.map(subFileText => ({
        text: options.showNavIcon ? `${options.filePrefix}${subFileText}` : subFileText,
        link: '/' + text + '/' + subFileText
      }))
      arr.push({
        text: options.showNavIcon ? `${options.dirPrefix}${text}` : text,
        items: [
          ...fileItems,
          ...folderItems,
        ]
      });
    })
  // 获取当前目录的文件
  let files = [];
  if ((files = FileHelper.getMdFiles(path).map(item => FileHelper.getFileNameByPath(item))).length > 0) {
    files.sort()
      .filter((item => !options.ignoreFiles.includes(item)))
      .forEach((item) => {
        arr.push({
          text: options.showNavIcon ? `${options.filePrefix}${item}` : item,
          link: '/' + item
        })
      })
  }
  return arr;
}

export { getNav }
