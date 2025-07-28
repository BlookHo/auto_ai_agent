process.env.NODE_ENV = process.env.NODE_ENV || 'development'

const environment = require('./environment')
const webpack = require('webpack')

// Get the environment config
const config = environment.toWebpackConfig()

// Development-specific configuration
config.devServer = config.devServer || {}
Object.assign(config.devServer, {
  host: 'localhost',
  port: 3035,
  https: false,
  hot: true,
  headers: {
    'Access-Control-Allow-Origin': '*'
  },
  devMiddleware: {
    publicPath: '/packs/'
  },
  static: {
    directory: 'public/packs'
  },
  client: {
    webSocketURL: {
      hostname: 'localhost',
      pathname: '/ws',
      port: 3035
    }
  }
})

// Add React Refresh plugin in development
// if (process.env.NODE_ENV === 'development') {
//   const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
  
//   // Ensure plugins array exists
//   config.plugins = config.plugins || []
  
//   // Add HMR and React Refresh plugins
//   // Use minimal configuration first to avoid options validation errors
//   config.plugins.push(
//     new webpack.HotModuleReplacementPlugin(),
//     new ReactRefreshWebpackPlugin({
//       overlay: false  // Disable overlay to avoid configuration issues
//     })
//   )
// }

module.exports = config
