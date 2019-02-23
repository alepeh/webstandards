import resolve from 'rollup-plugin-node-resolve';
import common from 'rollup-plugin-commonjs';


const views = ['ConfigurationView', 'HomeView', 'SchemaView', 'TableView', 'ItemView'].map(view => `src/views/${view}.js`);

export default [{
    input: 'src/app.js',
    output: {
      file: 'dist/app.js',
      format: 'esm'
    }
  }, {
    input: views,
    output: 
      {
        dir: 'dist/views',
        format: 'esm'
        },
    experimentalCodeSplitting: true,
    plugins: [
        resolve(),
        common()
      ]
    }
]