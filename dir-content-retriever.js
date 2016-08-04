/**
 * Retrieves content of a target as Javascript object
 *
 * Created by shaunthomas on 03/08/16.
 */
var fs = require('fs');
var path = require('path');

var result = {};

var displayContent = function(target) {
  result.filenames = [];
  result.dirnames = [];

  contentAggregator(target);

  return result;
};

var contentAggregator = function(target) {

  try {
    var stats = fs.statSync(target);

    if(stats.isDirectory()){
      result.dirnames.push(target);

      // Recrusively retrieve directory contents
      var dirContents = fs.readdirSync(target);
      for(var dirContent of dirContents){
        contentAggregator(path.join(target, dirContent));
      }
    }
    else if(stats.isFile()) {
      result.filenames.push(target);
    }
  }
  catch(err) {
    result = null;
  }

};

exports.displayContent = displayContent;