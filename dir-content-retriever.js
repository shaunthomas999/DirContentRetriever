/**
 * Retrieves content of a target as Javascript object
 *
 * Created by shaunthomas on 03/08/16.
 */
const fs = require('fs');
const path = require('path');

var DirContentRetriever = function() {};

DirContentRetriever.prototype.result = {};
DirContentRetriever.prototype.result.filenames = [];
DirContentRetriever.prototype.result.dirnames = [];

DirContentRetriever.prototype.displayContent = function(target) {
  this.contentAggregator(target);
  return this.result;
};

DirContentRetriever.prototype.contentAggregator = function(target) {

  try {
    let stats = fs.statSync(target);
    if(stats.isDirectory()){
      this.result.dirnames.push(target);

      // Recrusively check directory contents
      let dirContents = fs.readdirSync(target);
      for(let dirContent of dirContents){
        this.contentAggregator(path.join(target, dirContent));
      }
    }
    else if(stats.isFile()) {
      this.result.filenames.push(target);
    }
  }
  catch(err) {
    console.error(err);
    this.result = null;
  }

};

module.exports = new DirContentRetriever();