const path = require('path');

module.exports = {
  configure: {
    output: {
      path: path.resolve(__dirname, 'public'),
      publicPath: '/',
    },
  },
};
