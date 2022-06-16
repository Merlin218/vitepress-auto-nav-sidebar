import { Options } from '../types/custom';
export default function AutoNavPlugin(options: Partial<Options>): {
    nav: import("vitepress/types/default-theme").DefaultTheme.NavItem[];
    sidebar: import("vitepress/types/default-theme").DefaultTheme.Sidebar;
};
