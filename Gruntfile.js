module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    pleeease: {
      flex: {
        options: {
          autoprefixer: true,
          minifier: true,
          opacity: true,
          filters: true
        },
        files: {
          'alsacreations/003-flex/css/style.min.css': 'alsacreations/003-flex/css/*.css'
        }
      },
      main: {
        options: {
          autoprefixer: true,
          minifier: true
        },
        files: {
          'css/main.min.css': 'css/main.css'
        }
      }
    },
    compass: {
      dist: {
        options: {
          httpPath: "/",
          cssDir: "css",
          sassDir: "sass",
          imagesDir: "img",
          javascriptsDir: "js",
          outputStyle: "nested",
          noLineComments: true
        }
      }
    },

    watch: {
      options: {
        livereload: true
      },
      src: {
        files: ['js/*.js', 'css/**/*.scss', '**/*.html', '**/*.php'],
        tasks: ['default']
      }
    }
  });

  // Import du package
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-pleeease');
  grunt.loadNpmTasks('grunt-contrib-compass');

  // Redéfinition de la tâche `default` qui est la tâche lancée dès que vous lancez Grunt sans rien spécifier.
  // Note : ici, nous définissons sass comme une tâche à lancer si on lance la tâche `default`.
  //grunt.registerTask('default', ['sass:dist', 'pleeease:main', 'pleeease:flex']);
  grunt.registerTask('default', ['compass:dist', 'pleeease:main']);


}