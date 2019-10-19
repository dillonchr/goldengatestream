const { exec } = require('child_process');
const pastGifs = [];
let currentGifPath = null;
let gifTimeoutId = -1;

const clearGifPath = () => {
  pastGifs.push(currentGifPath);
  currentGifPath = null;
};

const generateGif = (callback) => {
  if (currentGifPath) {
    return callback(null, currentGifPath);
  }

  exec('./make.sh', {cwd: __dirname, shell: true}, (err, o, stdErr) => {
    const gifPath = o && !err && o.trim()
    if (o && o.trim().match(/\.gif$/)) {
      currentGifPath = o.trim();
      callback(null, currentGifPath);
      gifTimeoutId = setTimeout(clearGifPath, 60000);
    } else if (pastGifs.length) {
      callback(null, pastGifs[-1]);
    } else {
      callback(err || new Error(stdErr || 'No path returned'));
    }
  });
};

module.exports = {
  generateGif,
};
