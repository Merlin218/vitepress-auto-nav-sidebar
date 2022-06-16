type FolderConfig = {
  title: string,
  link?: string,
  items: (string | FolderConfig)[]
}[]

type FileConfig = string[]

const commonTop = (config: { title: string }) => `---
title: `+ config.title + `
---
## 该章节包含以下内容`

/**
 * @description: 
 * @param {string} files 文件列表
 * @param {string} title 生成页面标题
 * @return {*}
 */
const READMETemplate = (config: { files: FileConfig, folders: FolderConfig }, title: string): any => {
  //  如果为空数组
  if (config['files'].length === 0 && config['folders'].length === 0) return '';

  return commonTop({ title }) + `
  
  ` + config['files'].map((item:string) => `
- [${item.replace('.md', '')}](${item})

  `).join('') + config['folders'].map((item: any) => {
    // 获取该每个子目录的md文件
    const itemsTemplate = item.items.map((child: string) => `
- [${child.replace('.md', '')}](${item.link + '/' + child})

  `).join('');
    return `
#### [${item.title}](${item.link})
    ` + itemsTemplate
  }).join('');
}

export default {
  READMETemplate
}
