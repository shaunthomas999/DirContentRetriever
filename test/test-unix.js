/**
 * Created by shaunthomas on 03/08/16.
 */
module.exports = {

  setUp: function (callback) {
    this.DirContentRetriever = require('../dir-content-retriever.js');
    this.path = require('path');
    callback();
  },

  tearDown: function (callback) {
    expectedResult = undefined;
    actualResult = undefined;
    callback();
  },

  testResultWhenDirectoryIsTarget: function (test) {

    var expectedResult = '{ ' +
      '"filenames": ' +
      '[ "%TEST_DIR_NAME%/testFolder/foo/bar/bar1.txt",' +
        '"%TEST_DIR_NAME%/testFolder/foo/bar/bar2.txt",' +
        '"%TEST_DIR_NAME%/testFolder/foo/f1.txt",' +
        '"%TEST_DIR_NAME%/testFolder/foo/f2.txt" ],' +
      '"dirnames": ' +
        '[ "%TEST_DIR_NAME%/testFolder/foo",' +
          '"%TEST_DIR_NAME%/testFolder/foo/bar",' +
          '"%TEST_DIR_NAME%/testFolder/foo/bar/baz" ] }';
    var expectedResult = JSON.parse(expectedResult.replace(/%TEST_DIR_NAME%/g, __dirname));

    var actualResult = this.DirContentRetriever.displayContent(this.path.join(__dirname,'testFolder/foo'));

    test.deepEqual(actualResult, expectedResult);
    test.done();
  },

  /*
  testResultWhenFileIsTarget: function (test) {
    var expectedResult2 = '{ ' +
      '"filenames": ' +
      '[ "%TEST_DIR_NAME%/testFolder/foo/bar/bar1.txt" ],' +
      '"dirnames": [] }';
    var expectedResult2 = JSON.parse(expectedResult2.replace(/%TEST_DIR_NAME%/g, __dirname));

    var actualResult2 = this.DirContentRetriever.displayContent(this.path.join(__dirname,'testFolder/foo/bar/bar1.txt'));

    test.deepEqual(actualResult2, expectedResult2);
    test.done();
  },
  */

  testResultForNonExistingTarget: function (test) {
    var expectedResult = null;

    var actualResult = this.DirContentRetriever.displayContent(this.path.join(__dirname,'testFolder/foo/bar/bay'));

    test.deepEqual(actualResult, expectedResult);
    test.done();
  }

};