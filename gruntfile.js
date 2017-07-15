// gruntfile.js

module.exports = function(grunt) {
    //编写的任务
    grunt.initConfig({
        watch: {
            jade: {
                files: ['views/**'],  //要监听的文件
                options: {
                    livereload: true  //当文件改动时，重新启动服务
                }
            },
            js: {
                files: ['public/js/**', 'models/**/*.js', 'schemas/**/*.js'],
                // tasks:['jshint'], //语法检查
                options: {
                    livereload: true
                }
            }
        },

        jshint:{
            options:{
                jshintrc:'.jshintrc',
                ignores:['public/libs/**/*.js']
            },
            all:['public/js/*.js', 'test/**/*.js', 'app/**/*.js']
        },

        less:{
            development:{
                options:{
                    comprass: true,
                    yuicompress: true,
                    optimization:2
                },
                files:{
                    'public/build/index.css':'public/less/index.less'
                }
            }
        },

        uglify:{
             development:{
                files:{
                    'public/build/admin.min.js':'public/js/admin.js',
                    'public/build/detail.min.js':['public/js/detail.js']
                }
            }
        },

        nodemon: {
            dev: {  //开发环境
                options: {
                    file: 'app.js', //入口文件
                    args: [],
                    ignoredFiles: ['README.md', 'node_modules/**', '.DS_Store'],
                    watchedExtensions: ['js'],
                    // watchedFolders:['app','config'],
                    watchedFolders: ['./'],
                    debug: true,
                    delayTime: 1, //大批量文件改动时候，等待一段时间再重启服务
                    env: {
                        PORT: 3001
                    },
                    cwd: __dirname
                }
            }
        },

        mochaTest:{
            options:{
                reporter:'spec',
            },
            src:['test/**/*.js']
        },

        concurrent: {
            tasks: ['nodemon', 'watch'],
            options: {
                logConcurrentOutput: true
            }
        }

    });

    //加载安装的插件
    grunt.loadNpmTasks('grunt-contrib-watch'); //只要文件有操作，就会重新执行注册好的任务
    grunt.loadNpmTasks('grunt-nodemon');       //用来实时监听app.js
    grunt.loadNpmTasks('grunt-concurrent');    //针对慢任务开发的插件
    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.loadNpmTasks('grunt-contrib-jshint'); //jshint测试
    grunt.loadNpmTasks('grunt-contrib-uglify'); //js压缩
    grunt.loadNpmTasks('grunt-contrib-less');   //less编译 

    grunt.option('force', true); //目的：避免开发时因为语法错误而中断grunt的整个服务

    grunt.registerTask('default', ['concurrent']); //注册默认的任务
    grunt.registerTask('test', ['mochaTest']);

}