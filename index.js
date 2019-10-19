const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();
const { generateGif, getLastCachedGif } = require('./gg.js');

app.use(express.static('public'));

app.get('/gif', (req, res) => {
  if (req.query.hasOwnProperty('cached')) {
    const lastGif = getLastCachedGif();
    if (lastGif) {
      return res.sendFile(lastGif);
    }
  }
  generateGif((err, gifPath) => {
    if (err) {
      res.status(500);
      return res.send(err.toString());
    }
    res.sendFile(gifPath);
  });
});

app.listen(process.env.PORT || 3030);

