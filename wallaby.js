module.exports = function (wallaby) {
  return {
    files: [
      'src/**/*.js',
      'src/**/*.ts',
      'config/*.*',
      'public/*.*',
    ],

    tests: [
      'test/**/*test.js',
    ],

    env: {
      type: 'node',
    },


  };
};
