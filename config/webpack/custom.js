const path = require('path')
const webpack = require('webpack')
const { environment } = require('@rails/webpacker')

// Clear out the default entry to prevent conflicts
environment.entry.delete('application')

// Add our custom entry point
environment.entry.set('application', path.resolve(__dirname, '../../client/src/index.js'))

// Configure babel-loader for React
const babelLoader = environment.loaders.get('babel')
babelLoader.test = /\.(js|jsx|ts|tsx|coffee)?(?:\.erb)?$/

// Add React preset to babel
const babelLoaderConfig = babelLoader.use.find(loader => 
  loader.loader === 'babel-loader' || 
  (typeof loader === 'object' && loader.loader && loader.loader.includes('babel-loader'))
)

if (babelLoaderConfig) {
  babelLoaderConfig.options = babelLoaderConfig.options || {}
  babelLoaderConfig.options.presets = [
    ['@babel/preset-env', { 
      modules: false,
      targets: { browsers: ['> 1%', 'last 2 versions', 'not ie <= 11'] }
    }],
    ['@babel/preset-react', { runtime: 'automatic' }]
  ]
}

// Add fallbacks for Node.js core modules
environment.config.resolve.fallback = {
  ...environment.config.resolve.fallback,
  fs: false,
  path: require.resolve('path-browserify'),
  os: require.resolve('os-browserify/browser'),
  crypto: require.resolve('crypto-browserify'),
  stream: require.resolve('stream-browserify'),
  buffer: require.resolve('buffer/'),
  util: require.resolve('util/'),
  assert: require.resolve('assert/'),
  http: require.resolve('stream-http'),
  https: require.resolve('https-browserify'),
  url: require.resolve('url/'),
  querystring: require.resolve('querystring-es3')
}

// Add plugins for global variables
environment.plugins.prepend(
  'Provide',
  new webpack.ProvidePlugin({
    process: 'process/browser',
    Buffer: ['buffer', 'Buffer']
  })
)

// Export the modified environment
module.exports = environment
