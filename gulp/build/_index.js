const { series, parallel } = require('gulp');

// Paths
global.BUILD_PATHS = {
  root: './build',
  templates: {
    entry: './app/pug/*.pug',
    basedir: './app/pug',
    src: './app/pug/**/*.pug',
    dest: './build/',
  },
  styles: {
    entry: ['./app/sass/vendor.sass', './app/sass/main.sass'],
    src: './app/sass/**/*.sass',
    dest: './build/styles',
  },
  scripts: {
    entry: ['./app/scripts/vendor.js', './app/scripts/main.js'],
    src: './app/scripts/**/*.js',
    dest: './build/scripts',
  },
  images: {
    src: ['./app/static/images/**/*.*', '!./app/static/images/svg/svg-sprite/**/*'],
    dest: './build/images',
  },
  svgSprite: {
    src: './app/static/images/svg/svg-sprite/**/*',
    dest: './build/images/svg/svg-sprite/',
  },
  fonts: {
    src: './app/static/fonts/**/*',
    base: { base: 'app/static/' },
    dest: './build/',
    clean: './build/fonts/',
  }
};

const clean = require('./clean').clean;
const templates = require('./templates').templates;
const styles = require('./styles').styles;
const scripts = require('./scripts').scripts;
const images = require('./images').images;
const svgSprite = require('./svg-sprite').svgSprite;
const fonts = require('./fonts').fonts;

exports.build = series(
  clean,
  parallel(
    templates,
    styles,
    scripts,
    images,
    svgSprite,
    fonts
  )
);
