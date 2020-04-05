const path = require('path');

const optimize = require('./optimize');
const plugins = require('./plugins');

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const filename = ext => isDev ? `[name].${ext}` : `[name].[hash].${ext}`;

const babelOptions = preset => {
  const options = {
    presets: [
      [
        "@babel/preset-env",
        {
          "useBuiltIns": "usage",
          "corejs": 2
        },
      ],
      "minify"
    ],
    "plugins": [
      "@babel/plugin-transform-runtime"
    ]
  };
  if (preset) options.presets.push(preset);
  return options;
};

const jsLoaders = (react) => {
  const loaders = [{
    loader: 'babel-loader',
    options: babelOptions(react),
  }];
  
  if (isDev) loaders.push('eslint-loader', 'stylelint-custom-processor-loader');
  
  return loaders;
};

module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: 'development',
  entry: {
    main: ['@babel/polyfill', path.resolve(__dirname, '../src', 'index.js')],
  },
  output: {
    filename: filename('js'),
    path: path.resolve(__dirname, '../', 'build'),
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: require('./alias'),
  },
  optimization: optimize(),
  devServer: {
    port: 3333,
    hot: isDev,
    overlay: true,
    historyApiFallback: true,
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
  devtool: isDev ? 'source-map' : '',
  plugins: plugins(isDev, isProd),
  module: {
    rules: [
      {
        test: /\.(svg|png|jpg|jpeg|gif)$/,
        use: ['file-loader'],
      },
      {
        test: /\.(otf|ttf|woff|woff2|eot)$/,
        use: ['file-loader'],
      },
      {
        test: /\.(jsx?)$/,
        exclude: /node_modules/,
        use: jsLoaders('@babel/preset-react'),
      },
    ],
  },
};


