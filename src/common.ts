import { Options } from '../types/custom';
import FileHelper from './utils/fileHelper';


export function getFilterCurFolder(options: Options, path: string) {
	const folders = FileHelper.getCurDirs(path);
	folders.sort();
	return folders.filter(
		(item) =>
			!options.ignoreFolders?.includes(FileHelper.getDirNameByPath(item))
	);
}

export function getFilterCurMDFile(options: Options, path: string,) {
	const res = FileHelper.getMdFiles(path, '', options);
	res.sort();
	return res.filter((item) => {
		const fileName = FileHelper.getFileNameByPath(item);
		return (
			!options.ignoreFiles?.includes(fileName) && !fileName.startsWith(options?.hiddenFilePrefix || '.')
		);
	});
}

export function formatText(
	options: Options,
	text: string,
	target: 'nav' | 'sidebar',
	type: 'dir' | 'file',
) {
	if (target === 'nav') {
		return options?.showNavIcon ? `${options[`${type}Prefix`]}${text}` : text;
	}
	return options?.showSideIcon ? `${options[`${type}Prefix`]}${text}` : text;
}
