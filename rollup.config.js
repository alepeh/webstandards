import resolve from 'rollup-plugin-node-resolve';
import browsersync from 'rollup-plugin-browsersync';
import common from 'rollup-plugin-commonjs';


const views = ['ConfigurationView', 'HomeView', 'LoginView', 'SchemaView', 'TableView'].map(view => `src/views/${view}.js`);

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
        browsersync({server: 'dist',
            port: 8000,
            cors: true,
            notify: false
        }),
        resolve(),
        common()
      ]
    }
]