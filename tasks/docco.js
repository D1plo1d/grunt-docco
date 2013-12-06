// grunt-docco
// https://github.com/DavidSouther/grunt-docco
//
// Copyright (c) 2012 David Souther
// Licensed under the MIT license.

"use strict";
var docco = require('docco');
var path = require('path');

module.exports = function(grunt) {
  grunt.registerMultiTask('docco', 'Docco processor.', function() {
    var self = this;

    // onDoccoComplete waits until all files are processed to finish the task
    var done = this.async();
    var remainingFiles = 0;
    var onDoccoComplete = function() {
      remainingFiles -= 1;
      if (remainingFiles == 0) done();
    };

    this.files.forEach(function(file) {
      remainingFiles++;
      var options = {output: path.dirname(file.dest), args: [file.src[0]]};
      for (k in self.options) options[k] = self.options[k];
      docco.document(options, onDoccoComplete);
    });
  });
};
