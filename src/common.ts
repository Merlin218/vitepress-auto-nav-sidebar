import { getOptions } from './defaultConfig';
import FileHelper from './utils/fileHelper';

const options = getOptions();

export function getFilterCurFolder(path: string) {
	return FileHelper.getCurDirs(path)
		.sort()
		.filter(
			(item) =>
				!options.ignoreFolders?.includes(FileHelper.getDirNameByPath(item))
		);
}

export function getFilterCurMDFile(path: string) {
	const { hiddenFilePrefix, ignoreFiles } = options;
	return FileHelper.getMdFiles(path)
		.sort()
		.filter((item) => {
			const fileName = FileHelper.getFileNameByPath(item);
			return (
				!(ignoreFiles?.includes(fileName) || fileName.startsWith(hiddenFilePrefix || '.'))
			);
		});
}

export function formatText(
	text: string,
	target: 'nav' | 'sidebar',
	type: 'dir' | 'file'
) {
	if (target === 'nav') {
		return options.showNavIcon ? `${options[`${type}Prefix`]}${text}` : text;
	}
	return options.showSideIcon ? `${options[`${type}Prefix`]}${text}` : text;
}
