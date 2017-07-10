// gruntfile.js
module.exports = function(grunt){
    

    //引入插件
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-concurrent');    
    grunt.option('force',true); //避免开发时因为语法错误中断grunt的整个服务
    grunt.registerTask('default'),['concurrent']; //注册默认的任务
}