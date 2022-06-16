import { terser } from 'rollup-plugin-terser';
import typescript from 'rollup-plugin-typescript2';
import { nodeResolve } from '@rollup/plugin-node-resolve';

// rollup.config.js
export default {
  input: 'src/index.ts',
  output:[
    {
      file: 'lib/index.js',
      format: 'cjs',
      exports:'default'
    }
  ],
  plugins:[
    typescript({
      direction: true,
      removeComments: true,
      // 使用声明生成路径配置
      useTsconfigDeclarationDir: true,
    }),
    nodeResolve(),
    terser(),
  ]
};
