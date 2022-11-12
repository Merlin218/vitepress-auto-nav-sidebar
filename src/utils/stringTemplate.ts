type FolderConfig = {
  title: string,
  link?: string,
  items: (string | FolderConfig)[]
}

type FolderConfigs = FolderConfig[]

type FileConfig = string

type FileConfigs = FileConfig[]

const commonTop = (config: { title: string }): string => `---
title: `+ config.title + `
---
## 该章节包含以下内容`;

/**
 * @description: 
 * @param {string} files 文件列表
 * @param {string} title 生成页面标题
 * @return {*}
 */
const READMETemplate = (config: { files: FileConfigs, folders: FolderConfigs }, title: string): string => {
  //  如果为空数组
  if (config['files'].length === 0 && config['folders'].length === 0) return '';

  return commonTop({ title }) + `
  
  ` + config['files'].map((item: FileConfig) => `
- [${item.replace('.md', '')}](${item})

  `).join('') + config['folders'].map((item: FolderConfig) => {
    // 获取该每个子目录的md文件
    const itemsTemplate = item.items.map((child: string | FolderConfig) => {
      if (typeof child === 'string') {
        return `
        - [${child.replace('.md', '')}](${item.link + '/' + child})
        
          `;
      }
      return '';
    }).join('');
    return `
#### [${item.title}](${item.link})
    ` + itemsTemplate;
  }).join('');
};

export default {
  READMETemplate
};
