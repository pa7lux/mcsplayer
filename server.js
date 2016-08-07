var express = require('express')
var bodyParser = require('body-parser')
var app = express()
var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/mcsplayer');

app.use(express.static('build'))
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

var Track = mongoose.model('Track', {spotifyId: String});

var router = express.Router()
router.route('/favorites/')
  .post(function(req,res){
    var track = new Track()
    track.spotifyId = req.body.spotifyId;

    track.save(function(){
      console.log('successfully saved')
      res.json({message: 'saved'})
    })
  })

.get(function(req,res){
  Track.find(function(err,tracks){
    res.json(tracks)
  })
})
app.use('/api', router);

app.get('*',function(req,res){
  res.sendFile('build/index.html', {root: __dirname})
})

app.listen(8000,function(){
  console.log('server started on port 8000')
})
