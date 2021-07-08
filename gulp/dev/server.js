const browserSync = require('browser-sync');

const server = (done) => {
  browserSync({
    server: DEV_PATHS.server,
    ghostMode: {
      scroll: true
    },
    notify: false,
    scroll: true,
    open: true,
  });
  done();
};

exports.server = server;
