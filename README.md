# vitepress-auto-nav-sidebar

vuepress导航栏自动生成

[效果预览](https://www.merlin218.top)

## Feature

- 支持功能
    - [x] 自动生成nav和sidebar配置
    - [x] TypeScript支持
    - [x] 目录/文件前缀设置，默认为「 📂 」/「 ✏️ 」
    - [x] 目录/文件的过滤
- 下一步优化
   - [ ] 插件配置待丰富
   - [ ] 过滤支持正则

## Usage

1. 安装插件

```bash
pnpm i vitepress-auto-nav-sidebar
```

2. 在`vuepress`配置中使用插件，示例如下

```ts
import AutoNavPlugin from 'vitepress-auto-nav-sidebar'

const { nav, sidebar } = AutoNavPlugin({
  ignoreFolders: ["node_modules", "assets", "public", ".vuepress", "code", ".obsidian", "utils"], // 需要排除的一些目录
  ignoreFiles: ['个人简历'], // 需要排除的一些文件
  dirPrefix: '目录：',
  filePrefix: '文件：',
  showNavIcon:false,
  showSideIcon:true,
  isCollapse: true,
  collapsed: true,
})

module.exports = {
  themeConfig: {
    nav,
    sidebar,
  },
};
```

## Options

| 属性          | 类型                  | 默认值  | 描述                                                                                                                                               |
| ------------- | --------------------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------                                                                                                                                  |
| ignoreFolders | String[]              | []      | 需要排除的一些目录                                                                                                                                 |
| ignoreFiles   | String[]              | []      | 需要排除的一些文件                                                                                                                                 |
| filePrefix    | String                | ✏️       | 文件前缀修饰，有助于区分                                                                                                                           |
| dirPrefix    | String                | ✏️       | 目录前缀修饰，有助于区分                                                                                                                           |
| showNavIcon     | Boolean                | true       | 显示nav修饰                                                                                                                           |
| showSideIcon         | Boolean                | false        | 显示sidebar修饰                                                                                                           |
| isCollapsible    | Boolean                | true       | sidebar是否可折叠                                                                                                                           |
| collapsed    | Boolean                | true       | sidebar默认折叠情况                                                                                                                           |

