const { Router } = require('express');
const Song = require('../models/Song');


module.exports = Router()
  .post('/', async (req, res) => {
    const song = await Song.insert({
      title: req.body.title,
      artist: req.body.artist,
      album: req.body.album
    });
    res.send(song);
  });
