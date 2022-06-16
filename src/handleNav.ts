
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
      const items = subFolders.map((subFolderPath) => {
        const subText = FileHelper.getDirNameByPath(subFolderPath);
        const firstFile = FileHelper.getMdFiles(subFolderPath)[0]
        return {
          text: subText,
          link: '/' + text + '/' + subText + '/' + firstFile ?? FileHelper.getFileNameByPath(firstFile) ?? ''
        }
      })
      arr.push({
        text: `${options.dirPrefix}${text}`,
        items
      });
    })
  // 获取当前目录的文件
  let files = [];
  if ((files = FileHelper.getMdFiles(path)).length > 0) {
    files.sort()
      .filter((item => !options.ignoreFiles.includes(FileHelper.getFileNameByPath(item))))
      .forEach((item) => {
        arr.push({
          text: `${options.filePrefix}${FileHelper.getFileNameByPath(item)}`,
          link: '/' + item
        })
      })
  }
  return arr;
}

export { getNav }
