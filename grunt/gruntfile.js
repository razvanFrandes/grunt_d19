module.exports = function(grunt) {
    grunt.initConfig({

        // Sass compiler 
        sass: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '../src/sass',
                    src: ['style.scss'],
                    dest: '../dist/css/',
                    ext: '.css'
                }],

            }
        },

        // Autoprefixer
        autoprefixer: {
            options: {
                map: true,
                browsers: ['> 0.000001%']
            },
            no_dest_single: {
                src: '../dist/css/style.css'
            },
          },

        // CSS minifier
        cssmin: {
            minify: {
                options: {
                    keepSpecialComments: 0
                },
                files: [{

                    // General CSS miniier
                    expand: true,
                    cwd: '../dist/css',
                    src: ['*.css', '!*.min.css'],
                    dest: '../dist/css/',
                    ext: '.min.css'
                }]
            }
        },

        import_js: {
            files: {
              expand: true,
              cwd: '../src/js/',
              src: ['main.js'],
              dest: '../dist/js/',
              ext: '.js'
            }
          },

        // JS Concat
        concat: {
            options: {
              separator: ';',
              expand: true,
              minify: true,
              preserveComments: false,
            },
            dist: {
              src: '../dist/js/main.js',
              dest: '../dist/js/scripts.js',
            },
        },
         uglify: {
            js: {
                src:  ['../dist/js/scripts.js', '!../dist/js/scripts.min.js' ],
                dest: '../dist/js/scripts.min.js'
            },
        },

        // Reload Page when changes are made in php/html files.
        html: {
            files: ['*.php', '*.html'],
            options: {
                livereload: true,
           }
        },

        // Wacth for scss/js changes and autocompile them
        watch: {
            options: {
                spawn: false // Very important, don't miss this
            },
            css: {
                files: ['../src/sass/*.scss', '../src/sass/**/*.scss' , '!../src/sass/plugins/*.scss' , '!../src/sass/plugins/**/*.scss'],
                tasks: ['sass', 'autoprefixer' , 'cssmin'],
                options: {
                    livereload: true,
                }
            },
            js: {
                files: [ '../src/js/*.js' , '../src/js/**/*.js' , '!../src/js/plugins/*.js', '!../src/js/plugins/**/*.js'],
                tasks: [ 'import_js' , 'concat' , 'uglify'],
                options: {
                    livereload: true,
                }
            },


        },

    });


    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-import-js');

    /* Bs init works only on html static files. Please comment bs-init property if you work on a php project */
    grunt.registerTask('default', ['sass', 'autoprefixer' , 'cssmin' , 'import_js', 'concat', 'uglify', 'watch']);
};