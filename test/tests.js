/**
 * Created by shaunthomas on 03/08/16.
 */
module.exports = {

  setUp: function (callback) {
    this.DirContentRetriever = require('../dir-content-retriever.js');
    this.path = require('path');
    callback();
  },

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

  testResultWhenFileIsTarget: function (test) {

    var expectedResult = {};
    expectedResult.filenames = [];
    expectedResult.filenames.push(this.path.join(__dirname,'testFolder','foo','bar','bar1.txt'));
    expectedResult.dirnames = [];

    var actualResult = this.DirContentRetriever.displayContent(this.path.join(__dirname,'testFolder','foo','bar','bar1.txt'));

    test.deepEqual(actualResult, expectedResult);
    test.done();
  },

  testResultForNonExistingTarget: function (test) {
    var expectedResult = null;

    var actualResult = this.DirContentRetriever.displayContent(this.path.join(__dirname,'testFolder','foo','bar','bay'));

    test.deepEqual(actualResult, expectedResult);
    test.done();
  }

};