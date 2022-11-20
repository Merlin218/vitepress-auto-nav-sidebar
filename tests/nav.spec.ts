import { expect, describe, it } from 'vitest';
import AutoNavPlugin from '../src';

describe('nav main', () => {

  it('happy path', () => {
    const { nav } = AutoNavPlugin({
      entry: './example/docs1',
      dirPrefix: '',
      filePrefix: ''
    });

    expect(nav).toMatchObject([
      {
        text: 'folder',
        items: [
          {
            link: '/folder/B',
            text: 'B'
          }
        ]
      },
      {
        text: 'A',
        link: '/A'
      }
    ]);
  });

  it('file prefix', () => {
    const config = AutoNavPlugin({
      entry: './example/docs1',
      dirPrefix: '',
      filePrefix: 'file '
    });

    expect(config.nav).toMatchObject([
      {
        text: 'folder', items: [
          {
            link: '/folder/B',
            text: 'file B'
          }
        ]
      },
      {
        text: 'file A',
        link: '/A'
      }
    ]);
  });

  it('showNavIcon', () => {
    const config = AutoNavPlugin({
      entry: './example/docs1',
      dirPrefix: 'folder',
      showNavIcon: false,
      filePrefix: 'file '
    });

    expect(config.nav).toMatchObject([
      {
        text: 'folder', items: [
          {
            link: '/folder/B',
            text: 'B'
          }
        ]
      },
      {
        text: 'A',
        link: '/A'
      }
    ]);
  });

  it('folder prefix', () => {
    const config = AutoNavPlugin({
      entry: './example/docs1',
      dirPrefix: 'folder ',
      filePrefix: 'file '
    });

    expect(config.nav).toMatchObject([
      {
        text: 'folder folder', items: [
          {
            link: '/folder/B',
            text: 'file B'
          }
        ]
      },
      {
        text: 'file A',
        link: '/A'
      }
    ]);
  });

  it('sub folder', () => {
    const config = AutoNavPlugin({
      entry: './example/docs2',
      dirPrefix: '',
      filePrefix: ''
    });

    expect(config.nav).toMatchObject([
      {
        text: 'folder',
        items: [
          {
            text: 'B',
            link: '/folder/B'
          },
          {
            text: 'sub-folder',
            link: '/folder/sub-folder/C',
          },
        ]
      },
      {
        text: 'A',
        link: '/A'
      }
    ]);
  });

  it('should not exist nest items', () => {
    const config = AutoNavPlugin({
      entry: './example/docs3',
      dirPrefix: '',
      filePrefix: ''
    });

    expect(config.nav).toMatchObject([
      {
        text: 'folder',
        items: [
          {
            text: 'B',
            link: '/folder/B'
          },
          {
            text: 'sub-folder',
            link: '/folder/sub-folder/C',
          },
        ]
      },
      {
        text: 'A',
        link: '/A'
      }
    ]);
  });

  it('single layer nav', () => {
    const config = AutoNavPlugin({
      entry: './example/docs2',
      dirPrefix: '',
      singleLayerNav: true,
      filePrefix: ''
    });
    expect(config.nav).toMatchObject([
      {
        text: 'folder',
        link: '/folder/B'
      },
      {
        text: 'A',
        link: '/A'
      }
    ]);
  });

  it('single layer nav README', () => {
    const config = AutoNavPlugin({
      entry: './example/docs4',
      dirPrefix: '',
      singleLayerNav: true,
      filePrefix: ''
    });
    expect(config.nav).toMatchObject([
      {
        text: 'folder',
        link: '/folder/README'
      },
      {
        text: 'A',
        link: '/A'
      }
    ]);
  });

});
