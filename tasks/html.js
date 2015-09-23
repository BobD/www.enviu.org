module.exports = function(grunt) {
	var _ = require("underscore");
	var Handlebars = require('Handlebars');
	var path  = require('path');
	var buildPath = 'build/';

	grunt.registerTask('html', 'Compiles the Handlebar templates', function(buildTarget) {
		var pages = grunt.file.expand('src/' + buildTarget + '/html/*.html');
		var partials = grunt.file.expand({cwd: 'src/' + buildTarget + '/html/templates/'}, '**/*.hbs');
		var data = grunt.option('data');
		var partialName, partialHTML, dir, dir;

		Handlebars.registerHelper('menu_active', function(a, b) {
			return (a == b) ? 'active' : '';
		});

		Handlebars.registerHelper('grid_center', function(items, columns) {
			return (items.length < columns) ? 'grid--center' : '';
		});

		Handlebars.registerHelper('equals', function(a, b, opts) {
			if (a == b){
				return opts.fn(this);
			}
		});

		_.each(partials, function(file){
			dir = path.dirname(file);

			if(dir == '.'){
				dir = '';
			}else{
				dir += '/';
			}

			partialName = path.basename(file, '.hbs');
			partialHTML = grunt.file.read('src/' + buildTarget + '/html/templates/' + file);

			Handlebars.registerPartial(dir + partialName, partialHTML);
		});

		_.each(pages, function(file){
			compilePage(file);
		});

		function compilePage(file){
			var html = grunt.file.read(file);
			var name = path.basename(file, '.html');
			var template = Handlebars.compile(html);
			var html = template(data);

			grunt.file.write(buildPath + '/' + buildTarget + '/' +  name + '.html', html);
		}

	});

}