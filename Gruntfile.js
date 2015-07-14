'use strict';

module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		project: {
			app      : [''],
			src      : ['src'],
			assets   : ['assets'],
			sass     : ['<%= project.src %>/sass/style.scss'],
			vendorJS : [
				'bower_components/jquery/dist/jquery.min.js',
				'bower_components/fastclick/lib/fastclick.js',
				'bower_components/jquery-placeholder/jquery.placeholder.js',
				'bower_components/jquery-cookie/jquery.cookie.js',
				'bower_components/modernizr/modernizr.js',
				'bower_components/foundation/js/foundation.min.js',
				'bower_components/fitvids/jquery.fitvids.js',
				'<%= project.assets %>/vendor/javascripts/**/*.js'
			]
		},

		sass: {
			dev: {
				options: {
					outputStyle: 'expanded',
					compass: false
				},
				files: {
					'style.css':'<%= project.sass %>'
				}
			},
			dist: {
				options: {
					outputStyle: 'compressed',
					compass: false
				},
				files: {
					'style.css':'<%= project.sass %>'
				}
			}
		},

		uglify: {
			js: {
				src: '<%= project.vendorJS %>',
				dest: '<%= project.assets %>/javascripts/vendor.js',
			}
		},

		watch: {
			gruntfile: {
				files: 'Gruntfile.js',
				tasks: ['uglify:js']
			},

			sass: {
				files: '<%= project.src %>/sass/**/*.{scss,sass}',
				tasks: ['sass:dev']
			},

			js: {
				files: '<%= project.app %>/vendor/javascripts/**/*.js',
				tasks: ['uglify:js']
			}
		}
	});

	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('build', ['sass:dist', 'uglify:js']);

	grunt.registerTask('default', ['build', 'watch']);
};