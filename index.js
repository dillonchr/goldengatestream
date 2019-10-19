const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();
const { generateGif } = require('./gg.js');

app.use(express.static('public'));

app.get('/gif', (req, res) => {
  generateGif((err, gifPath) => {
    if (err) {
      res.status(500);
      return res.send(err.toString());
    }
    res.sendFile(gifPath);
  });
});

app.listen(process.env.PORT || 3030);

