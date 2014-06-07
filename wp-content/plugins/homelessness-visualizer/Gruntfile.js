'use strict';
module.exports = function(grunt) {
  grunt.initConfig({
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'Gruntfile.js',
        'assets/js/*.js'
      ]
    },
    compass: {
      dist: {
        options: {
          sassDir: 'assets/sass',
          cssDir: 'assets/css',
          config: 'config.rb'
        }
      }
    },
    uglify: {
      dist: {
        files: {
            'assets/js/homelessness-vis.min.js': [
            	'assets/js/homelessness-vis.js'
            ]
        },
        options: {
          beautify: true,
          mangle: false,
          compress: false
        }
      }
    },
    imagemin: { // Task
      all: {
        options: { // Target options
          optimizationLevel: 3
        },                       // Another target
        files: [{
          expand: true,                  // Enable dynamic expansion
          cwd: 'assets/img/src/',                   // Src matches are relative to this path
          src: ['**/*.{png,jpg,gif}'],   // Actual patterns to match
          dest: 'assets/img/prod/'                  // Destination path prefix
        }]
      }
    },
    watch: {
      sass: {
        files: [
        	'assets/sass/*.scss'
        ],
        tasks: ['compass']
      },
      img: {
        files: [
          'assets/img/src/*'
        ],
        tasks: ['imagemin']
      },
      js: {
        files: [
          '<%= jshint.all %>'
        ],
        tasks: ['uglify']
      }
    }
  });

  // Load tasks
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-imagemin');

  // Register tasks
  grunt.registerTask('default', [
    'compass',
    'imagemin',
    'uglify'
  ]);

  grunt.registerTask('dev', [
    'watch'
  ]);

};