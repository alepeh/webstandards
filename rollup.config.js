import resolve from 'rollup-plugin-node-resolve';
import browsersync from 'rollup-plugin-browsersync';
import common from 'rollup-plugin-commonjs';

export default [{
    input: 'src/app.js',
    output: 
      {
        file: 'dist/app.js',
        format: 'esm'
        },
    experimentalCodeSplitting: true,
    plugins: [
        browsersync({server: 'dist',
            port: 7000,
            cors: true,
            notify: false,
            open: false
        }),
        resolve(),
        common()
      ]
    }
]