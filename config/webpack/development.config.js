const path = require('path');
const { environment } = require('@rails/webpacker');
const webpack = require('webpack');

// Clear all existing entries
environment.entry.clear();

// Add our main application entry point
environment.entry.set('application', path.resolve(__dirname, '../../app/javascript/packs/application.js'));

// Configure babel loader for React
const babelLoader = environment.loaders.get('babel');
babelLoader.test = /\.(js|jsx|ts|tsx|coffee)?(?:\.erb)?$/;

// Enable HMR
environment.plugins.prepend('HMR', new webpack.HotModuleReplacementPlugin());

// Configure resolve aliases
environment.config.resolve = environment.config.resolve || {};
environment.config.merge({
  resolve: {
    alias: {
      ...(environment.config.resolve.alias || {}),
      'src': path.resolve(__dirname, '../../client/src'),
      'react': 'preact/compat',
      'react-dom': 'preact/compat',
      '@components': path.resolve(__dirname, '../../client/src/components'),
      '@pages': path.resolve(__dirname, '../../client/src/pages'),
      '@utils': path.resolve(__dirname, '../../client/src/utils'),
      '@styles': path.resolve(__dirname, '../../client/src/styles')
    }
  }
});

// Configure dev server
environment.config.devServer = {
  client: {
    webSocketURL: {
      hostname: 'localhost',
      pathname: '/ws',
      port: 3035
    }
  },
  devMiddleware: {
    publicPath: '/packs/'
  },
  headers: {
    'Access-Control-Allow-Origin': '*'
  },
  hot: true,
  liveReload: false,
  static: {
    directory: 'public/packs'
  }
};

// Export the modified environment
module.exports = environment;
