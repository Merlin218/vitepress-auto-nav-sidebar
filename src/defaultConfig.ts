import { Options } from '../types/custom';

const defaultOptions = (): Required<Options> => ({
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
});



export { defaultOptions };
