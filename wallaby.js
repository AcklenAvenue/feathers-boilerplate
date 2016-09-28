module.exports = function (wallaby) {
  return {
    files: [
      'src/**/*.js',
      'config/*.*',
      'public/*.*'
    ],

    tests: [
      'test/**/*test.js'
    ],

    env: {
      type: 'node'
    }


  };
};