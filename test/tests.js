/**
 * Created by shaunthomas on 03/08/16.
 */
module.exports = {

  setUp: function (callback) {
    this.DirContentRetriever = require('../dir-content-retriever.js');
    this.path = require('path');
    callback();
  },

  /**
   * Test the result when a directory is given as input
   * @param test
   */
  testResultWhenDirectoryIsTarget: function (test) {

    var expectedResult = {};
    expectedResult.filenames = [];
    expectedResult.filenames.push(this.path.join(__dirname,'testFolder','foo','bar','bar1.txt'));
    expectedResult.filenames.push(this.path.join(__dirname,'testFolder','foo','bar','bar2.txt'));
    expectedResult.filenames.push(this.path.join(__dirname,'testFolder','foo','f1.txt'));
    expectedResult.filenames.push(this.path.join(__dirname,'testFolder','foo','f2.txt'));
    expectedResult.dirnames = [];
    expectedResult.dirnames.push(this.path.join(__dirname,'testFolder','foo'));
    expectedResult.dirnames.push(this.path.join(__dirname,'testFolder','foo','bar'));

    var actualResult = this.DirContentRetriever.displayContent(this.path.join(__dirname,'testFolder','foo'));

    test.deepEqual(actualResult, expectedResult);
    test.done();
  },

  /**
   * Test the result when a file name is given as input
   * @param test
   */
  testResultWhenFileIsTarget: function (test) {

    var expectedResult = {};
    expectedResult.filenames = [];
    expectedResult.filenames.push(this.path.join(__dirname,'testFolder','foo','bar','bar1.txt'));
    expectedResult.dirnames = [];

    var actualResult = this.DirContentRetriever.displayContent(this.path.join(__dirname,'testFolder','foo','bar','bar1.txt'));

    test.deepEqual(actualResult, expectedResult);
    test.done();
  },

  /**
   * Test the result when a non-existing path is given as input
   * @param test
   */
  testResultForNonExistingTarget: function (test) {
    var expectedResult = null;

    var actualResult = this.DirContentRetriever.displayContent(this.path.join(__dirname,'testFolder','foo','bar','bay'));

    test.deepEqual(actualResult, expectedResult);
    test.done();
  },

  /**
   * Test the result when a relative path is given as input
   * @param test
   */
  testResultForRelativePathTarget: function (test) {

    var expectedResult = {};
    expectedResult.filenames = [];
    expectedResult.filenames.push(this.path.join(__dirname,'testFolder','foo','bar','bar1.txt'));
    expectedResult.filenames.push(this.path.join(__dirname,'testFolder','foo','bar','bar2.txt'));
    expectedResult.dirnames = [];
    expectedResult.dirnames.push(this.path.join(__dirname,'testFolder','foo','bar'));

    var target = ".%test%testFolder%foo%bar%..%bar"
    var actualResult = this.DirContentRetriever.displayContent(target.replace(/%/g, this.path.sep));

    test.deepEqual(actualResult, expectedResult);
    test.done();
  }

};