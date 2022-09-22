import { getNav } from './handleNav'
import { resolve } from 'path';
import { Options } from '../types/custom';

import { setOptions, defaultOptions } from './defaultConfig'
import { getSidebar } from './handleSider';

export default function AutoNavPlugin(options: Partial<Options>) {
  if (!options) options = defaultOptions
  const assignOptions = Object.assign({}, defaultOptions, options)
  setOptions(assignOptions)
  const path = resolve(process.cwd(), assignOptions.entry ?? 'docs');
  return {
    nav: getNav(path),
    sidebar: getSidebar(path)
  }
}
