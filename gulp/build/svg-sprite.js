const { src, dest } = require('gulp');

const svgSprite = () => {
  return src(BUILD_PATHS.svgSprite.src)
    .pipe(dest(BUILD_PATHS.svgSprite.dest))
};

exports.svgSprite = svgSprite;
