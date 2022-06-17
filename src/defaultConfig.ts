import { Options } from "../types/custom"

let defaultOptions: Options = {
  ignoreFolders: [],
  ignoreFiles: [],
  dirPrefix: '📂  ',
  filePrefix: '✏️  ',
  showNavIcon: true,
  showSideIcon: false,
  isCollapsible: true,
  collapsed: false,
  singleLayerNav:false
}

function setOptions(options: Options) {
 Object.assign(defaultOptions,options)
}

function getOptions() {
  return defaultOptions || {};
}

export {
  defaultOptions, setOptions, getOptions
}
