var path = require('path')
var webpack = require('webpack')

module.exports = {
  cache: true,
  debug: true,
  devtool: 'source-map',
  entry: {
    app:  ['webpack/hot/dev-server','./public/js/app']
  },
  devServer: {
    contentBase: './public'
  },
  output: {
    path: path.join(__dirname, 'public/dist'),
    publicPath: '/dist',
    filename: '[name].js',
    chunkFilename: '[chunkhash].js',
    sourceMapFilename: 'debugging/[file].map',
    hotUpdateChunkFilename: 'hot/[id].[hash].hot-update.js',
    hotUpdateMainFilename: 'hot/[hash].hot-update.json'
  },
  module: {
    loaders: [
      {test: /\.js$/, exclude:[/node_modules/, /bower_components/, /public\/components/], loader: 'babel-loader?optional=runtime'},
      {test: /\.jsx$/, exclude:[/node_modules/, /bower_components/, /public\/components/], loaders: [ 'react-hot', 'babel-loader?optional=runtime']},
      {test: /\.css$/, loader: 'style-loader!css-loader'}
    ],
    noParse: /\.min\.js/
  },
  resolve: {
    modulesDirectories: ['public/components', 'node_modules', 'bower_components'],
    extensions: ['', '.js', '.jsx', '.json']
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.ProvidePlugin({
      jQuery: 'jquery',
      $: 'jquery'
    }),
    new webpack.ResolverPlugin(
      new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin("bower.json", ["main"])
    )
  ]
}