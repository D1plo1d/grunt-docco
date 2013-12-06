// grunt-docco
// https://github.com/DavidSouther/grunt-docco
//
// Copyright (c) 2012 David Souther
// Licensed under the MIT license.

"use strict";
var docco = require('docco');

module.exports = function(grunt) {
  grunt.registerMultiTask('docco', 'Docco processor.', function() {
    var self = this;
    // onDoccoComplete waits until all files are processed to finish the task
    var done = this.async();
    var remainingFiles = 0;
    var onDoccoComplete = function() {
      if (remainingFiles-- == 0) done();
    };
    console.log("a");
    this.files.forEach(function(file) {
      remainingFiles++;
      var options = self.options({output: file.dest, args: [file.src[0]]});
      docco.document(options, onDoccoComplete);
    });
  });
};
