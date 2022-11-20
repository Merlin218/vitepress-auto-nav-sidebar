import { describe, it, expect } from 'vitest';
import FileHelper from '../src/utils/fileHelper';
import { join } from 'path';
describe('fileHelper function', () => {

  it('hasSubDirs', () => {
    const path = join(__dirname, '../example');

    expect(FileHelper.hasSubDirs(path)).toBe(true);
  });

  it('getAllDirs', () => {
    let path = join(__dirname, '../example/docs3');

    let deepfolders = FileHelper.getAllDirs(path);
    expect(deepfolders).toMatchObject([
      '/folder',
      '/folder/sub-folder',
      '/folder/sub-folder/sub-sub-folder',
    ].map(item => path + item));

    path = join(__dirname, '../example/docs3');
    deepfolders = FileHelper.getAllDirs(path, ['sub-folder']);
    expect(deepfolders).toMatchObject([
      '/folder',
    ].map(item => path + item));
  });


  it('getCurDirs', () => {
    const path = join(__dirname, '../example/docs3');

    const curDirs = FileHelper.getCurDirs(path);
    expect(curDirs).toMatchObject([
      '/folder',
    ].map(item => path + item));
  });

  it('getCurFiles', () => {
    let path = join(__dirname, '../example/docs4');
    let files = FileHelper.getCurFiles(path);
    expect(files).toMatchObject([
      'A.md',
      'test.txt'
    ]);

    path = join(__dirname, '../example/docs4');
    files = FileHelper.getCurFiles(path, ['md']);
    expect(files).toMatchObject([
      'A.md',
    ]);

    path = join(__dirname, '../example/docs4');
    files = FileHelper.getCurFiles(path, ['mdd']);
    expect(files).toMatchObject([]);

    path = join(__dirname, '../example/docs4');
    files = FileHelper.getCurFiles(path, ['txt'], ['test.txt']);
    expect(files).toMatchObject([]);
  });

  it('getDirNameByPath', () => {
    const path = join(__dirname, '../example/docs4');
    const dirname = FileHelper.getDirNameByPath(path);
    expect(dirname).toBe('docs4');
  });

  it('getFileNameByPath', () => {
    const path = join(__dirname, '../example/docs4/A.md');
    const filename = FileHelper.getFileNameByPath(path);
    expect(filename).toBe('A');
  });

  it('hasREADME', () => {
    let path = join(__dirname, '../example/docs4');
    let res = FileHelper.hasREADME(path);
    expect(res).toBe(false);

    path = join(__dirname, '../example/docs4/folder');
    res = FileHelper.hasREADME(path);
    expect(res).toBe(true);
  });

  it('getMdFiles', () => {
    const path = join(__dirname, '../example/docs4/folder');
    const files = FileHelper.getMdFiles(path);
    expect(files).toMatchObject([
      'B.md',
      'README.md'
    ]);
  });
});
