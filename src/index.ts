import { getNav } from './handleNav';
import { resolve } from 'path';
import { Options } from '../types/custom';

import { defaultOptions } from './defaultConfig';
import { getSidebar } from './handleSider';

export default function AutoNavPlugin(options?: Partial<Options>) {

  const assignOptions = Object.assign({}, defaultOptions(), options);
  const path = resolve(process.cwd(), assignOptions.entry);
  return {
    nav: getNav(assignOptions, path),
    sidebar: getSidebar(assignOptions, path)
  };
}
