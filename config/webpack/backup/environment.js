const { environment } = require('@rails/webpacker')

// Minimal configuration
const config = environment.toWebpackConfig()

// Add React support
config.module.rules.push({
  test: /\.(js|jsx)$/,
  exclude: /node_modules/,
  use: {
    loader: 'babel-loader',
    options: {
      presets: [
        ['@babel/preset-env', { modules: false }],
        ['@babel/preset-react', { runtime: 'automatic' }]
      ]
    }
  }
})

// Development only configuration
if (process.env.RAILS_ENV === 'development') {
  const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
  config.plugins.push(new ReactRefreshWebpackPlugin())
}

module.exports = config
