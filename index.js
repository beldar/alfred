process.env.BABEL_DISABLE_CACHE=1;

require('babel-register')({
  presets: ['es2015']
});
require('babel-polyfill');

require('./app.js');
