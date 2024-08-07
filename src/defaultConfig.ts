import { Options } from '../types';

let defaultOptions: Options = {
	entry: 'docs',
	ignoreFolders: [],
	ignoreFiles: [],
	dirPrefix: '📂  ',
	filePrefix: '✏️  ',
	showNavIcon: true,
	showSideIcon: false,
	isCollapsible: true,
	collapsed: false,
	singleLayerNav: false,
	customParentFolderName: '',
	hiddenFilePrefix: '.',
};

function setOptions(options: Options) {
	defaultOptions = Object.assign(defaultOptions, options);
}

function getOptions() {
	return defaultOptions;
}

export { defaultOptions, setOptions, getOptions };
