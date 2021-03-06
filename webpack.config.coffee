webpack = require 'webpack'

module.exports =

  context: __dirname

  target: 'web'

  entry: "#{__dirname}/src/index.js"

  output:
    path: __dirname
    chunkFilename: 'chunk-[id].js'
    library: ['effected']
    libraryTarget: 'umd'

  resolve:
    extensions: [
      ''
      '.js'
    ]

  plugins: [
    new webpack.BannerPlugin(
      '''
      @license effected.js Copyright(c) 2016 sasa+1
      https://github.com/sasaplus1/effected.js
      Released under the MIT license.
      '''
    ,
      options:
        raw: false
        entryOnly: true
    )
    new webpack.NoErrorsPlugin
    new webpack.IgnorePlugin(/vertx/)
    new webpack.optimize.OccurenceOrderPlugin
    new webpack.optimize.DedupePlugin
    new webpack.optimize.AggressiveMergingPlugin
  ]
