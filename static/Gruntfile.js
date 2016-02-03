module.exports = function(grunt) {

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        clean: ['assets/dist'],

        sass: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'assets/src/sass',
                    src: ['master.scss'],
                    dest: 'assets/dist/css',
                    ext: '.css'
                }]
            }
        },

        concat: {   
            dist: {
                src: [
                    'assets/src/js/libs/jquery.js',
                    'assets/src/js/plugins/navigation-menus.js',
                    'assets/src/js/plugins/magnific-popup.js',
                    'assets/src/js/plugins/clamp.js',
                    'assets/src/js/plugins/tag-autosuggest.js',
                    'assets/src/js/plugins/pjax.js',
                    'assets/src/js/main.js'
                ],
                dest: 'assets/dist/js/package.js',
            }
        },

        watch: {
            options: {
                livereload: true,
            },
            sass: {
                files: ['assets/src/sass/*.scss', 'assets/src/sass/**/*.scss'],
                tasks: ['clean', 'sass', 'autoprefixer', 'copy', 'concat', 'uglify', 'cssmin', 'version-assets', 'cssmin', 'version-css'],
            },
            js: {
                files: ['assets/src/js/*.js', 'assets/src/js/**/*.js'],
                tasks: ['clean', 'sass', 'autoprefixer', 'cssmin', 'concat', 'copy', 'uglify', 'version-assets'],
            },
            html: {
                files: ['templates/*.html', 'templates/**/*.html']
            }
        },

        uglify: {
            my_target: {
                options:{
                    banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("dd-mm-yyyy") %> */\n',
                },
                files: {
                    'assets/dist/js/package.min.js' : ['assets/dist/js/package.js'],
                    'assets/dist/js/bookmarklet-iframe.min.js' : ['assets/dist/js/bookmarklet-iframe.js']
                }
            }
        },

        cssmin: {
            minify: {
                expand: true,
                cwd: 'assets/dist/css',
                src: ['master.css', '!*.min.css'],
                dest: 'assets/dist/css/',
                ext: '.min.css'
            }
        },

        copy: {
            main: {
                files: [
                    { expand: true, flatten: true, src: ['assets/src/images/*'], dest: 'assets/dist/images/', filter: 'isFile' },
                    { expand: true, flatten: true, src: ['assets/src/fonts/*'], dest: 'assets/dist/fonts/', filter: 'isFile' },
                    { expand: true, flatten: true, src: ['assets/src/icons/fonts/*'], dest: 'assets/dist/fonts/', filter: 'isFile' },
                    { expand: true, flatten: true, src: ['assets/src/js/bookmarklet-iframe.js'], dest: 'assets/dist/js/', filter: 'isFile' },
                ]
            }
        },

        autoprefixer: {
            options: {
                // Task-specific options go here.
            },
            single_file: {
                options: {
                    // Target-specific options go here.
                },
                src: 'assets/dist/css/master.css',
                dest: 'assets/dist/css/master.css'
            },
        },



    });


    grunt.event.on('watch', function(action, filepath, target) {
        grunt.log.writeln(target + ': ' + filepath + ' has ' + action);
    });

    grunt.registerTask('version-assets', 'version the static assets just created', function() {
        var Version = require("node-version-assets");
        var versionInstance = new Version({
            assets: [
                'assets/dist/js/package.min.js',
                'assets/dist/images/logo-white.svg',
                'assets/dist/images/logo-round-coloured.svg',
                'assets/dist/images/favicon.png',
                'assets/dist/images/favicon-114.png',
                'assets/dist/images/logo-square-120.png',
                'assets/dist/images/loading.svg',
                'assets/dist/images/collage.jpg',
                'assets/dist/images/linkpin-screenshot.png',
                'assets/dist/fonts/icons.eot',
                'assets/dist/fonts/icons.svg',
                'assets/dist/fonts/icons.ttf',
                'assets/dist/fonts/icons.woff',
                'assets/dist/fonts/OpenSans-Light-webfont.eot',
                'assets/dist/fonts/OpenSans-Light-webfont.svg',
                'assets/dist/fonts/OpenSans-Light-webfont.ttf',
                'assets/dist/fonts/OpenSans-Light-webfont.woff',
                'assets/dist/fonts/OpenSans-Regular-webfont.eot',
                'assets/dist/fonts/OpenSans-Regular-webfont.svg',
                'assets/dist/fonts/OpenSans-Regular-webfont.ttf',
                'assets/dist/fonts/OpenSans-Regular-webfont.woff',
                'assets/dist/fonts/OpenSans-Semibold-webfont.eot',
                'assets/dist/fonts/OpenSans-Semibold-webfont.svg',
                'assets/dist/fonts/OpenSans-Semibold-webfont.ttf',
                'assets/dist/fonts/OpenSans-Semibold-webfont.woff',
            ],
            grepFiles: ['templates/master.html', '../src/bookmarks/templates/bookmarklet-logo.html', 'assets/dist/css/master.css', '../src/homepage/templates/homepage-signed-out.html'],
            keepOriginal: true,
        });
        var cb = this.async();
        versionInstance.run(cb);
    });

    grunt.registerTask('version-css', 'version the master css just created', function() {
        var Version = require("node-version-assets");
        var versionInstance = new Version({
            assets: [
                'assets/dist/css/master.min.css',
            ],
            grepFiles: ['templates/master.html']
        });
        var cb = this.async();
        versionInstance.run(cb);
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-autoprefixer');

    grunt.registerTask('default', ['dev']);
    grunt.registerTask('dev', ['clean', 'sass', 'autoprefixer', 'copy', 'concat', 'uglify', 'cssmin', 'version-assets', 'cssmin', 'version-css', 'watch']);
    grunt.registerTask('prod', ['clean', 'sass', 'autoprefixer', 'copy', 'concat', 'uglify', 'cssmin', 'version-assets', 'cssmin', 'version-css']);

};