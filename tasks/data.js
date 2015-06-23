module.exports = function(grunt) {
	var _ = require("underscore");
	var path  = require('path');
	var data = {}

	grunt.registerTask('data', 'Loads testing data', function(target) {
		var dataFiles = grunt.file.expand('src/' + target +'/data/*.json');
		var id, json;

		_.each(dataFiles, function(file){
			id = path.basename(file, '.json');
			json = grunt.file.readJSON(file);
			data[id] = json;
		});

		grunt.option('data', data);
	});
};