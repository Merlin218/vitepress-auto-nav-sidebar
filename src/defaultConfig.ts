import { Options } from "../types/custom"

let defaultOptions: Options = {
  subNavShow: [],
  ignoreFolders: [],
  ignoreFiles: [],
  dirPrefix: '📂  ',
  filePrefix: '✏️  ',
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
