const { environment } = require('@rails/webpacker')
const webpack = require('webpack')
const path = require('path')

// Configure resolve aliases
environment.config.resolve = environment.config.resolve || {}
environment.config.resolve.alias = {
  ...(environment.config.resolve.alias || {}),
  'src': path.resolve(__dirname, '../../client/src'),
  'react': 'preact/compat',
  'react-dom': 'preact/compat',
  '@components': path.resolve(__dirname, '../../client/src/components'),
  '@pages': path.resolve(__dirname, '../../client/src/pages'),
  '@utils': path.resolve(__dirname, '../../client/src/utils'),
  '@styles': path.resolve(__dirname, '../../client/src/styles')
}

// Configure entry points
environment.entry = environment.entry || {}
if (!environment.entry.application) {
  environment.entry.application = path.resolve(__dirname, '../../client/src/index.js')
}

// Configure babel loader for React
const babelLoader = environment.loaders.get('babel')
babelLoader.test = /\.(js|jsx|ts|tsx|coffee)?(?:\.erb)?$/

// Add app/javascript to the babel loader include paths
babelLoader.include = [
  ...(babelLoader.include || []).filter(includePath => 
    !includePath.includes('client')
  ),
  path.resolve(__dirname, '../../app/javascript')
]

// Add React preset to babel
babelLoader.use[0].options.presets = babelLoader.use[0].options.presets || [];
if (!babelLoader.use[0].options.presets.includes('@babel/preset-react')) {
  babelLoader.use[0].options.presets.push('@babel/preset-react');
}

// Export the environment
module.exports = environment
const babelLoaderConfig = babelLoader.use.find(loader => 
  loader.loader === 'babel-loader' || 
  (typeof loader === 'object' && loader.loader && loader.loader.includes('babel-loader'))
)

if (babelLoaderConfig) {
  babelLoaderConfig.options = babelLoaderConfig.options || {}
  
  // Ensure presets is an array
  babelLoaderConfig.options.presets = babelLoaderConfig.options.presets || [];
  
  // Add @babel/preset-env if not already present
  if (!babelLoaderConfig.options.presets.some(preset => 
    Array.isArray(preset) && preset[0] && preset[0].includes('@babel/preset-env'))
  ) {
    babelLoaderConfig.options.presets.push(['@babel/preset-env', { 
      modules: false,
      targets: { browsers: ['> 1%', 'last 2 versions', 'not ie <= 11'] }
    }]);
  }
  
  // Add @babel/preset-react if not already present
  if (!babelLoaderConfig.options.presets.some(preset => 
    Array.isArray(preset) && preset[0] && preset[0].includes('@babel/preset-react'))
  ) {
    babelLoaderConfig.options.presets.push(['@babel/preset-react', { 
      runtime: 'automatic' 
    }]);
  }
}

// Export the modified environment
module.exports = environment
