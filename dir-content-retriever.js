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
    let dirContents = fs.readdirSync(target);

    for(let dirContent of dirContents){
      let dirContentAbsolute = path.join(target, dirContent);
      let stats = fs.statSync(dirContentAbsolute);
      if(stats.isDirectory()){
        this.result.dirnames.push(dirContentAbsolute);
        this.contentAggregator(dirContentAbsolute);
      }
      else if(stats.isFile()) {
        this.result.filenames.push(dirContentAbsolute);
      }
    }
  }
  catch(err) {
    console.error(err);
  }

};

module.exports = new DirContentRetriever();