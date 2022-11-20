
import { DefaultTheme } from 'vitepress/types/default-theme';
import FileHelper from './utils/fileHelper';
import { formatText, getFilterCurFolder, getFilterCurMDFile } from './common';
import { defaultOptions } from './defaultConfig';
import { Options } from '../types/custom';

/**
 * @description: 获取导航配置项
 * @param {string} path 目录路径
 * @param {number} depth 目录深度
 * @param {string} prefix 父级前缀
 * @return {*} 返回nav配置
 */
const getNav = (options: Options = defaultOptions(), path: string,): DefaultTheme.NavItem[] => {
  return [
    // 过滤后的文件夹列表
    ...getFilterCurFolder(options, path).map((dir: string) => {
      // 获取文件夹名称
      const text = FileHelper.getDirNameByPath(dir);
      if (options?.singleLayerNav) {
        // 如果只显示一层Nav
        return genSingleLayerNav(options, dir, text);
      } else {
        // 显示多层Nav
        // ps. vitepress官方类型定义中，并不支持多层items嵌套。
        return {
          text: formatText(options, text, 'nav', 'dir'),
          items: [
            ...genFileNavItems(options, dir, text),
            ...genFolderNavItems(options, dir, text),
          ]
        };
      }
    }),
    // 过滤后的文件列表
    ...getFilterCurMDFile(options, path).map(item => {
      const fileText = FileHelper.getFileNameByPath(item);
      return {
        text: formatText(options, fileText, 'nav', 'file'),
        link: '/' + fileText
      };
    })
  ];
};


function genFolderNavItems(options: Options, dir: string, text: string,) {
  return getFilterCurFolder(options, dir).map((subFolderPath) => {
    const folderText = FileHelper.getDirNameByPath(subFolderPath);
    const firstFile = getFilterCurMDFile(options, subFolderPath)[0];
    return {
      text: formatText(options, folderText, 'nav', 'dir'),
      link: '/' + text + '/' + folderText + (firstFile ? '/' + FileHelper.getFileNameByPath(firstFile) : '')
    };
  });
}

function genFirstFileNavItem(options: Options, dir: string, text: string,) {
  // 设置为第一个文件 或者 第一个文件夹下的第一个文件
  const firstFile = getFilterCurMDFile(options, dir)[0];
  let firstFileName = '';
  if (firstFile) {
    firstFileName = '/' + FileHelper.getFileNameByPath(firstFile);
  } else {
    const firstFolder = getFilterCurFolder(options, dir)[0];
    const firstFolderName = FileHelper.getDirNameByPath(firstFolder);
    if (FileHelper.hasREADME(firstFolder)) {
      firstFileName = '/' + firstFolderName + '/README';
    } else {
      const firstFolderFirstFile = getFilterCurMDFile(options, firstFolder)[0];
      firstFileName = '/' + firstFolderFirstFile ? firstFolderName + '/' + FileHelper.getFileNameByPath(firstFolderFirstFile) : '';
    }
  }
  return {
    text: formatText(options, text, 'nav', 'dir'),
    link: '/' + text + firstFileName
  };
}

function genFileNavItems(options: Options, dir: string, text: string,) {
  return getFilterCurMDFile(options, dir).map(item => {
    const fileText = FileHelper.getFileNameByPath(item);
    return {
      text: formatText(options, fileText, 'nav', 'file'),
      link: '/' + text + '/' + fileText
    };
  });
}

function genSingleLayerNav(options: Options, dir: string, text: string,): DefaultTheme.NavItem {
  if (FileHelper.hasREADME(dir)) {
    // 如果存在README文件，设置为README文件
    return {
      text: formatText(options, text, 'nav', 'dir'),
      link: '/' + text + '/README'
    };
  } else {
    // 否则设置为第一个文件 或者 第一个文件夹下的第一个文件
    return genFirstFileNavItem(options, dir, text);
  }
}



export { getNav };
