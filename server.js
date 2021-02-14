var express = require('express');
var bodyParser = require('body-parser');
var Pusher = require('pusher');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const APP_ID =  process.env.APP_ID || '';
const APP_KEY = process.env.APP_KEY || '';
const APP_SECRET = process.env.APP_SECRET || '';
const CLUSTER = process.env.CLUSTER || '';

var pusher = new Pusher({ appId: APP_ID, key: APP_KEY, secret:  APP_SECRET, cluster: CLUSTER });

app.use(express.static(__dirname + '/public'));

app.post('/message', function(req, res) {
  var message = req.body.message;
  pusher.trigger( 'public-chat', 'message-added', { message: message });
  res.sendStatus(200);
});

app.get('/matches',function(req,res){
  res.sendFile('public/matches.html', { root: __dirname });
});

app.get('/chat',function(req,res){      
  res.sendFile('public/chat.html', { root: __dirname });
});

app.get('/faq',function(req,res){
  res.sendFile('public/faq.html', { root: __dirname });
});

app.get('/dashboard',function(req,res){      
  res.sendFile('public/dashboard.html', { root: __dirname });
});

app.get('/',function(req,res){      
     res.sendFile('public/index.html', { root: __dirname });
});

var port = process.env.PORT || 5000;
app.listen(port, function () {
  console.log(`app listening on port ${port}!`)
});