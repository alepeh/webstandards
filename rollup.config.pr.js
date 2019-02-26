import resolve from 'rollup-plugin-node-resolve';
import common from 'rollup-plugin-commonjs';

export default [{
    input: 'src/app.js',
    output: {
      file: 'dist/app.js',
      format: 'esm'
    },
    experimentalCodeSplitting: true,
    plugins: [
        resolve(),
        common()
      ]
  }
]