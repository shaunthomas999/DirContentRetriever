/**
 * Retrieves content of a target as Javascript object
 *
 * Created by shaunthomas on 03/08/16.
 */
var fs = require('fs');
var path = require('path');

var result;

/**
 * Used to get content of a target path in specific Javascript format
 * @param target - Target whose content has to be retrieved
 * @returns {}
 */
var retrieveContent = function(target) {
  result = {};
  result.filenames = [];
  result.dirnames = [];

  contentAggregator(path.resolve(target));

  return result;
};

/**
 * Aggregate contents of target recrusively
 * @param target - Target whose content has to be retrieved
 */
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

exports.retrieveContent = retrieveContent;