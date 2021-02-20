const path = require('path')

module.exports = {
  entry: './src/index.tsx',
  resolve: {
    alias: {
      react: path.resolve('./node_modules/react')
    },
    extensions: ['.ts', '.tsx', '.js']
  },
  module: {
    rules: [{
      test: /\.(ts|tsx)$/,
      loader: 'ts-loader'
    }]
  }
}
