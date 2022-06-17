import { Options } from "../types/custom"

let defaultOptions: Options = {
  ignoreFolders: [],
  ignoreFiles: [],
  dirPrefix: '📂  ',
  filePrefix: '✏️  ',
  showNavIcon: true,
  showSideIcon: false,
  isCollapsible: true,
  collapsed: true,
}

function setOptions(options: Options) {
  defaultOptions = options
}

function getOptions() {
  return defaultOptions || {};
}

export {
  defaultOptions, setOptions, getOptions
}
