module.exports = function(grunt) {
	var config = grunt.file.readJSON('config.json');
	var localPath = config.distribute.local;

	console.log(localPath);

	grunt.registerTask('export', 'Copy the production files to the proper location for further testing', function(target) {

		grunt.config('copy.export.files', [
			{expand: true, cwd: 'dist/' + target + '/css' , src: ['**/*.*', '**/.*'], dest: localPath + '/css', filter: 'isFile'},
			{expand: true, cwd: 'dist/' + target + '/images/static' , src: ['**/*.*', '**/.*'], dest: localPath + '/images/static', filter: 'isFile'},
			{expand: true, cwd: 'dist/' + target + '/fonts' , src: ['**/*.*', '**/.*'], dest: localPath + '/fonts', filter: 'isFile'},
			{expand: true, cwd: 'dist/' + target + '/scripts' , src: ['**/*.*', '**/.*'], dest: localPath + '/js', filter: 'isFile'},
		]);

		grunt.task.run([target, 'requirejs:' + target, 'copy:dist', 'copy:export']);
	});

}