// Generated on 2014-06-25 using generator-angular 0.9.1
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function(grunt) {

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    // Configurable paths for the application
    var appConfig = {
        app: require('./bower.json').appPath || 'app',
        dist: 'dist'
    };

    // Define the configuration for all the tasks
    grunt.initConfig({

        // Project settings
        yeoman: appConfig,

        // Watches files for changes and runs tasks based on the changed files
        watch: {
            sass: {
                files: ['<%= yeoman.app %>/styles/{,*/}*.{scss,sass}'],
                tasks: ['sass:server']
            },
            template: {
                files: [
                    '<%= yeoman.app %>/views/{,*/}*.html',
                    '<%= yeoman.app %>/views/cliche/{,*/}*.html',
                    '<%= yeoman.app %>/views/app/{,*/}*.html',
                    '<%= yeoman.app %>/views/repo/{,*/}*.html',
                    '<%= yeoman.app %>/views/task/{,*/}*.html'
                ],
                tasks: ['templates']
            }
        },

        // Make sure code styles are up to par and there are no obvious mistakes
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish'),
                ignores: ['**/*template.js', 'bower_components/**/*']
            },
            all: {
                src: [
                    'Gruntfile.js',
                    '<%= yeoman.app %>/scripts/**/*.js'
                ]
            },
            test: {
                options: {
                    jshintrc: 'test/.jshintrc'
                },
                src: ['test/spec/{,*/}*.js']
            }
        },

        sass: {
            server: {
                options: {
                    style: 'expanded',
                    sourcemap: 'auto'
                },
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app %>/styles',
                    src: ['*.scss'],
                    dest: '<%= yeoman.app %>/styles',
                    ext: '.css'
                }]
            },
            dist: {
                options: {
                    style: 'compressed',
                    sourcemap: 'none'
                },
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app %>/styles',
                    src: ['*.scss'],
                    dest: '.tmp/styles',
                    ext: '.css'
                }]
            }
        },

        // The following *-min tasks will produce minified files in the dist folder
        // By default, your `index.html`'s <!-- Usemin block --> will take care of
        // minification. These next options are pre-configured if you do not wish
        // to use the Usemin blocks.
        cssmin: {
            dist: {
                files: {
                    '<%= yeoman.dist %>/styles/main.css': [
                        '.tmp/styles/{,*/}*.css'
                    ]
                }
            }
        },
        /*uglify: {
            dist: {
                files: {
                    '<%= yeoman.dist %>/scripts/vendor.min.js': [
                        '<%= yeoman.dist %>/scripts/vendor.js'
                    ],
                    '<%= yeoman.dist %>/scripts/dyole.min.js': [
                        '<%= yeoman.dist %>/scripts/util.js',
                        '<%= yeoman.dist %>/scripts/integration.js',
                        '<%= yeoman.dist %>/scripts/cliche.js',
                        '<%= yeoman.dist %>/scripts/dyole.js'
                    ],
                    '<%= yeoman.dist %>/scripts/cliche.min.js': [
                        '<%= yeoman.dist %>/scripts/util.js',
                        '<%= yeoman.dist %>/scripts/integration.js',
                        '<%= yeoman.dist %>/scripts/cliche.js'
                    ]
                }
            }
        },*/
        /*concat: {
            options: {
                separator: ';'
            },
            common: {
                src: [
                    '<%= yeoman.app %>/scripts/util/!*.js',
                    '<%= yeoman.app %>/scripts/util/!**!/!*.js',
                    '<%= yeoman.app %>/scripts/app/!*.js',
                    '<%= yeoman.app %>/scripts/app/!**!/!*.js',
                    '<%= yeoman.app %>/scripts/repo/!*.js',
                    '<%= yeoman.app %>/scripts/repo/!**!/!*.js',
                    '<%= yeoman.app %>/scripts/common/!*.js',
                    '<%= yeoman.app %>/scripts/common/!**!/!*.js'
                ],
                dest: 'dist/scripts/util.js'
            },
            dyole: {
                src: [
                    '<%= yeoman.app %>/scripts/cliche/!**!/!*.js',
                    '<%= yeoman.app %>/scripts/dyole-app/!*.js',
                    '<%= yeoman.app %>/scripts/dyole/dyole.config.js',
                    '<%= yeoman.app %>/scripts/dyole/!**!/!*.js'
                ],
                dest: 'dist/scripts/dyole.js'
            },
            cliche: {
                src: [
                    '<%= yeoman.app %>/scripts/cliche-app/!*.js',
                    '<%= yeoman.app %>/scripts/cliche/!*.js',
                    '<%= yeoman.app %>/scripts/cliche/!**!/!*.js'
                ],
                dest: 'dist/scripts/cliche.js'
            },
            integration: {
                src: [
                    '<%= yeoman.app %>/scripts/integration/!*.js',
                    '<%= yeoman.app %>/scripts/integration/!**!/!*.js'
                ],
                dest: 'dist/scripts/integration.js'
            },
            vendor: {
                src: [
                    'bower_components/angular/angular.js',
                    'bower_components/angular-resource/angular-resource.js',
                    'bower_components/angular-cookies/angular-cookies.js',
                    'bower_components/angular-sanitize/angular-sanitize.js',
                    'bower_components/angular-animate/angular-animate.js',
                    'bower_components/angular-ui-router/release/angular-ui-router.js',

                    'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
                    'bower_components/ng-prettyjson/dist/ng-prettyjson.min.js',

                    'bower_components/angular-marked/angular-marked.js',
                    'bower_components/ng-tags-input/ng-tags-input.js',

                    'bower_components/angular-ui-notification/dist/angular-ui-notification.min.js',

                    '<%= yeoman.app %>/vendor/chronicle/chronicle.js',
                    '<%= yeoman.app %>/vendor/jsandbox/src/jsandbox.js',
                    '<%= yeoman.app %>/vendor/angular-ui-sortable/sortable.min.js'

                ],
                dest: 'dist/scripts/vendor.js'
            }
        },*/


        // Copies remaining files to places other tasks can use
        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= yeoman.app %>',
                    dest: '<%= yeoman.dist %>',
                    src: [
                        '*.{ico,png,txt}',
                        '.htaccess',
                        '*.html',
                        //'views/{,*/}*.html',
                        '!**/views/**',
                        'images/{,*/}*.{png,jpg,jpeg,gif,webp,svg,ico}',
                        'fonts/*',
                        //                            'bower_components/*'
                        'bower_components/es5-shim/es5-shim.js',
                        'bower_components/json3/lib/json3.min.js',
                        'bower_components/zeroclipboard/dist/ZeroClipboard.swf',
                        'data/*',
                        'vendor/jsandbox/src/jsandbox-worker.js',
                        'vendor/raphael/*'
                    ]
                }, {
                    expand: true,
                    cwd: '.tmp/images',
                    dest: '<%= yeoman.dist %>/images',
                    src: ['generated/*']
                }]
            }
        },

        ngtemplates: {

            cliche: {
                cwd: '<%= yeoman.app %>',
                src: [
                    'views/{,*/}*.html',
                    'views/cliche/{,*/}*.html',
                    'views/app/{,*/}*.html',
                    'views/repo/{,*/}*.html',
                    'views/task/{,*/}*.html'
                ],
                dest: '<%= yeoman.app %>/scripts/cliche/template.js',
                options: {
                    module: 'registryApp.cliche',
                    htmlmin: {
                        collapseWhitespace: true,
                        collapseBooleanAttributes: true
                    }
                }
            },

            dyole: {
                cwd: '<%= yeoman.app %>',
                src: [
                    'views/{,*/}*.html',
                    'views/dyole/{,*/}*.html',
                    'views/cliche/{,*/}*.html',
                    'views/app/{,*/}*.html',
                    'views/repo/{,*/}*.html',
                    'views/task/{,*/}*.html'
                ],
                dest: '<%= yeoman.app %>/scripts/dyole/template.js',
                options: {
                    module: 'registryApp.dyole',
                    htmlmin: {
                        collapseWhitespace: true,
                        collapseBooleanAttributes: true
                    }
                }
            }
        }

    });

    grunt.registerTask('templates', [
        'ngtemplates:cliche',
        'ngtemplates:dyole'
    ])
};

