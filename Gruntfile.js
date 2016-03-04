/*
 After you have changed the settings at "Your code goes here",
 run this with one of these options:
  "grunt" alone creates a new, completed images directory
  "grunt clean" removes the images directory
  "grunt responsive_images" re-processes images without removing the old ones
*/

module.exports = function(grunt) {

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    // minifying the .js code and save it with a .min extension
    uglify: {
       target: {
        files: [{
          expand: true,
          cwd: 'src',
          src: ['**/*.js'],
          dest: 'dist',
          ext: '.min.js'
        }]
      }
    },

    // minify all contetnts of a release directory and add a .min.css extension
    cssmin: {
      target: {
        files: [{
          expand: true,
          cwd: 'src',
          src: ['**/*.css'],
          dest: 'dist',
          ext: '.min.css'
        }]
      }
    },

    // minifying HTML
    htmlmin: {
       dist: {
          options: {
             removeComments: true,
             collapseWhitespace: true
          },
          files: [{
             expand: true,
             cwd: "src",
             src: '**/*.html',
             dest: 'dist/',
             ext: ".html"
          }]
       }
    },

    /* Copy the "fixed" images that don't go through processing into the dist files */
    copy: {
      dev: {
        files: [{
          expand: true,
          cwd: 'src',
          src: ['**/*.{gif,jpg,png}'],
          dest: 'dist'
        }]
      }
    },


    responsive_images: {
      dev: {

        options: {
          engine: 'im',
          sizes: [{
              name: 'small',
              quality: 60,
              width: 100
            },{
              name: 'medium',
              width: 100
            },{
              name: "large",
              width: 200,
              // suffix: "_x2"
              // quality: 60
          }]
        },

        /*
        You don't need to change this part if you don't change
        the directory structure.
        */
        files: [{
          expand: true,
          src: ['*.{gif,jpg,png}'],
          cwd: 'images_src/',
          dest: 'images/'
        }]
      }
    },

    /* Clear out the images directory if it exists */
    clean: {
      dev: {
        src: ['images'],
      },
    },

    /* Generate the images directory if it is missing */
    mkdir: {
      dev: {
        options: {
          create: ['images']
        },
      },
    },
  });

  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-responsive-images');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-mkdir');
  grunt.registerTask('images', ['clean', 'mkdir', 'responsive_images']);
  grunt.registerTask('default', ['uglify', 'cssmin', "htmlmin", "copy"]);

};
