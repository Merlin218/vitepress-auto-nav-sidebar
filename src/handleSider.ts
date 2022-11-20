
import { DefaultTheme } from 'vitepress/types/default-theme';
import FileHelper from './utils/fileHelper';
import { defaultOptions } from './defaultConfig';
import { formatText, getFilterCurFolder, getFilterCurMDFile } from './common';
import { Options } from '../types/custom';


/**
 * @description: 获取导航配置项
 * @param {string} path 目录路径
 * @return {*} 返回nav配置
 */
const getSidebar = (options: Options = defaultOptions(), path: string,): DefaultTheme.Sidebar => {
  const sidebar: DefaultTheme.Sidebar = {};
  getFilterCurFolder(options, path).forEach((dir: string) => {
    const folderText = FileHelper.getDirNameByPath(dir);
    const propName = '/' + folderText + '/';
    const subFolders = getFilterCurFolder(options, dir);
    const folderItems = subFolders.map((subFolderPath) => {
      const subText = FileHelper.getDirNameByPath(subFolderPath);
      const subSubFolderName = getFilterCurFolder(options, subFolderPath).map((item) => FileHelper.getDirNameByPath(item));
      const subSubFileName = getFilterCurMDFile(options, subFolderPath).map((item) => FileHelper.getFileNameByPath(item));
      return {
        text: formatText(options, subText, 'sidebar', 'dir'),
        collapsible: options?.isCollapsible,
        collapsed: options?.collapsed,
        items: [
          ...subSubFolderName.map((item) => ({
            text: formatText(options, item, 'sidebar', 'dir'),
            link: propName + subText + '/' + item + '/'
          })),
          ...subSubFileName.map((item => ({
            text: formatText(options, item, 'sidebar', 'file'),
            link: propName + subText + '/' + item
          })))
        ]
      };
    });
    sidebar[propName] = [
      ...folderItems,
    ];
    const subFiles = getFilterCurMDFile(options, dir).map(item => FileHelper.getFileNameByPath(item));
    if (subFiles.length > 0) {
      const fileItems = subFiles.map(item => ({
        text: formatText(options, item, 'sidebar', 'file'),
        link: propName + '/' + item
      }));
      const parentFolderName = options?.customParentFolderName && options?.customParentFolderName !== '' ? options?.customParentFolderName : dir.substring(dir.lastIndexOf('/') + 1);
      sidebar[propName].unshift({
        text: formatText(options, parentFolderName, 'sidebar', 'dir'),
        collapsible: options?.isCollapsible,
        collapsed: options?.collapsed,
        items: fileItems
      });
    }
  });
  return sidebar;
};

export { getSidebar };
