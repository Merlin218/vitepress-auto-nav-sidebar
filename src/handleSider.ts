
import { DefaultTheme } from 'vitepress/types/default-theme'
import FileHelper from './utils/fileHelper'
import { getOptions } from './defaultConfig';

const defaultArticleFolderName = '文章'

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
    const folderItems = subFolders.map((subFolderPath) => {
      const subText = FileHelper.getDirNameByPath(subFolderPath);
      const subSubFolderName = FileHelper.getCurDirs(subFolderPath).map((item) => FileHelper.getDirNameByPath(item));
      const subSubFileName = FileHelper.getMdFiles(subFolderPath).map((item) => FileHelper.getFileNameByPath(item))
      return {
        text: options.showSideIcon ? `${options.dirPrefix}${subText}` : subText,
        collapsible: options.isCollapsible,
        collapsed: options.collapsed,
        items: [
          ...subSubFolderName.map((item) => ({
            text: options.showSideIcon ? `${options.dirPrefix}${item}` : item,
            link: propName + subText + '/' + item + '/'
          })),
          ...subSubFileName.map((item => ({
            text: options.showSideIcon ? `${options.filePrefix}${item}` : item,
            link: propName + subText + '/' + item
          })))
        ]
      }
    })
    sidebar[propName] = [
      ...folderItems,
    ]
    const subFiles = FileHelper.getMdFiles(dir).map(item => FileHelper.getFileNameByPath(item));
    if (subFiles.length > 0) {
      const fileItems = subFiles.map(item => ({
        text: options.showSideIcon ? `${options.filePrefix}${item}` : item,
        link: propName + '/' + item
      }))
      sidebar[propName].unshift({
        text: options.showSideIcon ? `${options.dirPrefix}${defaultArticleFolderName}` : defaultArticleFolderName,
        collapsible: options.isCollapsible,
        collapsed: options.collapsed,
        items: fileItems
      })
    }
  })
  return sidebar;
}

export { getSidebar }
