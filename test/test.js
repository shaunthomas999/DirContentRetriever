/**
 * Created by shaunthomas on 03/08/16.
 */
var DirContentRetriever = require('../dir-content-retriever.js');
var finalResult = DirContentRetriever.displayContent('/Users/shaunthomas/git2/DirContentRetriever/test/testFolder/foo/');

console.log("=== Displaying final result ===");
console.log(finalResult);
