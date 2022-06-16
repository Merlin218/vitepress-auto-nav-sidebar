
import { DefaultTheme } from 'vitepress/types/default-theme'
import FileHelper from './utils/fileHelper'
import { getOptions } from './defaultConfig';
/**
 * @description: 获取导航配置项
 * @param {string} path 目录路径
 * @return {*} 返回nav配置
 */
const getSidebar = (path: string): DefaultTheme.Sidebar => {
  const options = getOptions();
  const sidebar: DefaultTheme.Sidebar = {}
  FileHelper.getCurDirs(path).sort().forEach((dir: string) => {
    const folderText = FileHelper.getDirNameByPath(dir);
    const propName = '/' + folderText + '/'
    const subFolders = FileHelper.getCurDirs(dir);
    sidebar[propName] = subFolders.map((subFolderPath) => {
      const subText = FileHelper.getDirNameByPath(subFolderPath);
      const subSubFolderName = FileHelper.getCurDirs(subFolderPath).map((item) => FileHelper.getDirNameByPath(item));
      const subSubFileName = FileHelper.getMdFiles(subFolderPath).map((item) => FileHelper.getFileNameByPath(item))
      return {
        text: `${options.dirPrefix}${subText}`,
        items: [
          ...subSubFolderName.map((item) => ({
            text: `${options.dirPrefix}${item}`,
            link: propName + subText + '/' + item + '/'
          })),
          ...subSubFileName.map((item => ({
            text: `${options.filePrefix}${item}`,
            link: propName + subText + '/' + item
          })))
        ]
      }
    })
  })
  return sidebar;
}

export { getSidebar }
