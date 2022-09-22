import path from 'path';
import { readdirSync, statSync, writeFileSync } from 'fs'
import Template from './stringTemplate'
import { getOptions } from '../defaultConfig';

/**
 *
 * @param {String} dir 目录路径
 * @param {Array} SuffixIncludes 需要处理的文件后缀
 * @returns
 */
const getCurFiles = (dir: string, SuffixIncludes: string[] = [], unFileIncludes: string[] = []) => {
  if (!dir) return [];
  // readdirSync 仅返回当前这层的数据
  const filenameList = readdirSync(dir).sort().filter((filename: string) => {
    // statSync() 用来获取文件信息 stat => status
    const fileInfo = statSync(path.join(dir, filename));
    //获取后缀
    const suffix = filename.slice(filename.lastIndexOf(".") + 1);
    return fileInfo.isFile() && SuffixIncludes.includes(suffix) && isNotReadme(filename) && !unFileIncludes.includes(filename)
  });
  return filenameList;
};

/**
 * @description: 判断是否是README文件
 * @param {string} filename
 * @return {*}
 */
const isNotReadme = (filename: string) => filename.toLocaleLowerCase() !== "readme.md"

/**
 *
 * @param {String} dir 当前的目录路径
 * @param {Array} unDirIncludes 需要排除的某些目录(文件夹)
 * @returns {Array} allDirs 所有的目录
 */
const getAllDirs = (dir = ".", unDirIncludes: string[]) => {
  if (!dir) return [];
  // 获取目录数据
  const items = readdirSync(dir);
  let allDirs: string[] = [];
  // 递归遍历目录中所有文件夹
  items.forEach((item: string) => {
    const dirName = path.join(dir, item);
    if (statSync(dirName).isDirectory() && !unDirIncludes.includes(item)) {
      allDirs.push(dirName);
      allDirs = allDirs.concat(getAllDirs(dirName, unDirIncludes));
    }
  });
  return allDirs;
};

/**
 * @description: 获取当前目录下的子目录
 * @param {String} dir 当前的目录路径
 * @param {Array} unDirIncludes 需要排除的某些目录(文件夹)
 * @returns {Array} 子目录列表
 */
const getCurDirs = (dir = "."): string[] => {
  if (!dir) return [];
  const options = getOptions()
  // 获取目录数据
  const items = readdirSync(dir);
  const allCurDirs: string[] = [];
  // 递归遍历目录中所有文件夹
  items.forEach((item: string) => {
    const dirName = path.join(dir, item);
    if (statSync(dirName).isDirectory() && !options.ignoreFolders?.includes(item)) {
      allCurDirs.push(dirName);
    }
  });
  return allCurDirs;
};

/**
 * @description: 生成目录README.md
 * @param {string} dir 文件目录
 * @return {*}
 */
const createREADME = (dir: string) => {
  const options = getOptions();
  // 获取md文件列表
  const configs = {
    files: getCurFiles(dir, ['md'], options.ignoreFiles),
    folders: getCurDirs(dir).map(item => {
      return {
        title: item.substring(item.lastIndexOf('/') + 1),
        link: item.replace(dir, '.'),
        items: getCurFiles(item, ['md'], options.ignoreFiles) || []
      }
    })
  }
  // 生成文件内容
  const content = Template.READMETemplate(configs, dir.substring(dir.lastIndexOf('/') + 1));
  // 文件路径
  const file = path.join(dir, './README.md')
  // 写入文件
  writeFileSync(file, content)
}

/**
* @description: 判断是否存在子目录
* @param {string} path 目录路径
* @param {string} unDirIncludes 排除文件
* @return {*} 返回布尔值
*/
const hasSubDirs = (path: string) => {
  return getCurDirs(path).length > 0
}

/**
 * @description: 获取子目录文件
 * @param {string} path 目录路径
 * @param {string} prefix 文件前缀
 * @return {array} 返回带前缀的文件名列表
 */
const getMdFiles = (path: string, prefix = '') => {
  if (!path) return [];
  const options = getOptions();
  const files = getCurFiles(path, ['md'], options.ignoreFiles)
  return files.map((item: string) => prefix + item);
}

const getDirNameByPath = (dir: string) => {
  return dir.substring(dir.lastIndexOf('/') + 1)
}

const getFileNameByPath = (dir: string) => {
  return dir.substring(dir.lastIndexOf('/') + 1, dir.lastIndexOf('.'))
}

const hasIndexMd = (path: string) => {
  if (!path) return false;
  return getCurFiles(path, ['md']).map(item => getFileNameByPath(item)).includes('index')
}

export default {
  getCurFiles, getAllDirs, getCurDirs, createREADME, hasSubDirs, getMdFiles, getFileNameByPath, getDirNameByPath, hasIndexMd
}

