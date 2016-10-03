

module.exports = {
  entry: "./src/scripts/main.js",
  output: {
    filename: "./dist/scr/bundle.js"
  },
  // devtool: 'source-map',
     devServer:{
         contentBase: 'dist'
     },
  module: {
     preLoaders: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'jshint-loader'

        }
     ],
     loaders: [
       {
         test: /\.js$/,
         exclude: '/node_modules/',
         loader: 'babel',
         query: {
            cacheDirectory: true, 
            presets: ['react', 'es2015'] 
         }
        },
        {
          test: /\.scss$/,
          loaders: ['style', 'css', 'sass']
        }
          
     ]
   },
   resolve: {
     extensions: ['', '.js', '.es6']
   }
}
