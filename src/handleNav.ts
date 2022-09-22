
import { DefaultTheme } from 'vitepress/types/default-theme'
import FileHelper from './utils/fileHelper'
import { formatText, getFilterCurFolder, getFilterCurMDFile } from './common';
import { getOptions } from './defaultConfig';

const options = getOptions();
/**
 * @description: 获取导航配置项
 * @param {string} path 目录路径
 * @param {number} depth 目录深度
 * @param {string} prefix 父级前缀
 * @return {*} 返回nav配置
 */
const getNav = (path: string): DefaultTheme.NavItem[] => {
  const arr: DefaultTheme.NavItem[] = []
  getFilterCurFolder(path)
    .forEach((dir: string) => {
      const text = FileHelper.getDirNameByPath(dir);
      if (options.singleLayerNav) {
        if (FileHelper.hasIndexMd(dir)) {
          arr.push({
            text: formatText(text, 'nav', 'dir'),
            link: '/' + text + '/'
          });
        } else {
          const firstFile = getFilterCurMDFile(dir)[0];
          const firstFolder = getFilterCurFolder(dir)[0];
          const firstFolderFirstFile = getFilterCurMDFile(firstFolder)[0];
          arr.push({
            text: formatText(text, 'nav', 'dir'),
            link: '/' + text + '/' + firstFile ?? `${FileHelper.getDirNameByPath(firstFolder)}/${FileHelper.getFileNameByPath(firstFolderFirstFile)}` ?? ''
          });
        }

      } else {
        const subFolders = getFilterCurFolder(dir);
        const folderItems = subFolders.map((subFolderPath) => {
          const subFolderText = FileHelper.getDirNameByPath(subFolderPath);
          const firstFile = getFilterCurMDFile(subFolderPath)[0]
          return {
            text: formatText(subFolderText, 'nav', 'dir'),
            link: '/' + text + '/' + subFolderText + '/' + firstFile ?? FileHelper.getFileNameByPath(firstFile) ?? ''
          }
        })
        const subFiles = getFilterCurMDFile(dir).map(item => FileHelper.getFileNameByPath(item));
        const fileItems = subFiles.map(subFileText => ({
          text: formatText(subFileText, 'nav', 'file'),
          link: '/' + text + '/' + subFileText
        }))
        arr.push({
          text: formatText(text, 'nav', 'dir'),
          items: [
            ...fileItems,
            ...folderItems,
          ]
        });
      }
    })
  // 获取当前目录的文件
  let files = [];
  if ((files = getFilterCurMDFile(path).map(item => FileHelper.getFileNameByPath(item))).length > 0) {
    files.forEach((item) => {
      arr.push({
        text: formatText(item, 'nav', 'file'),
        link: '/' + item
      })
    })
  }
  return arr;
}

export { getNav }
