const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass')(require('sass'));
const spritesmith = require('gulp.spritesmith');
const rimraf = require('rimraf');
const rename = require('gulp-rename');
const autoprefixer = require('gulp-autoprefixer');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
const htmlmin = require('gulp-htmlmin');



// SERVER ------------------->
gulp.task('server', function() {
    browserSync.init({
        server: {
            port: 9000,
            baseDir: "build"
        }
    });


    gulp.watch('build/**/*').on('change', browserSync.reload);
});

// html compile ------------->
gulp.task('minify', () => {
    return gulp.src('source/template/*.html')
      .pipe(htmlmin({ collapseWhitespace: true }))
      .pipe(gulp.dest('build'));
  });


// Autoprefixer -------------->
gulp.task('autoprefixer', function(done) {
    gulp.src('build/css/*.css')
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(gulp.dest('build/css'));

        done();
})


// Style compile ------------->
gulp.task('styles:compile', function buildStyles() {
    return gulp.src('source/styles/main.scss')
      .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
      .pipe(autoprefixer())
      .pipe(rename('main.min.css'))
      .pipe(gulp.dest('build/css'));
});
  
gulp.task('js', function() {
    return gulp.src([
        'source/js/main.js'
    ])
    .pipe(sourcemaps.init())
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('build/js'));
});




// Sprite -------------> 
gulp.task('sprite', function (cb) {
    var spriteData = gulp.src('source/images/icons/*.png').pipe(spritesmith({
      imgName: 'sprite.png',
      imgPath: '../images/sprite.png',
      cssName: 'sprite.scss'
    }));
    
    spriteData.img.pipe(gulp.dest('build/images/'))
    spriteData.css.pipe(gulp.dest('source/styles/global/'));
    cb();
});


// Delete ------------> 
gulp.task('clean', function del(cb) {
    return rimraf('build', cb);
});


// Copy images ---------------->
gulp.task('copy:images', function() {
    return gulp.src('./source/images/**/*.*')
    .pipe(gulp.dest('build/images'));
});


// Copy --------------------------> 
gulp.task('copy', gulp.parallel('copy:images'));

// Watchers ----------------------->
gulp.task('watch', function() {
    gulp.watch('source/template/**/*.html', gulp.series('minify'));
    gulp.watch('source/styles/**/*.scss', gulp.series('styles:compile'));
    gulp.watch('source/js/**/*.js', gulp.series('js'));
})

gulp.task('default', gulp.series(
    'clean',
    gulp.parallel('minify', 'autoprefixer', 'styles:compile', 'js', 'sprite', 'copy'),
    gulp.parallel('watch', 'server')
    )
);