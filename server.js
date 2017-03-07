var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var engine = require('ejs-mate');
var session = require('express-session');
var mongoose = require('mongoose');
var MongoStore = require('connect-mongo')(session);


var app = express()

mongoose.connect('mongodb://localhost/rateme');

app.use(express.static('public'));
app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(session({
  secret:'Thisismytestkey',
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({mongooseConnection: mongoose.connection})
}));

//adicionando novas rotas que estao na pasta route
require('./routes/user')(app);

/*app.get('/', function(req, res, next){
	res.render('index');
});*/

app.get('/test', function(req, res, next){
	res.render('test')
});

app.listen(3000, function(){
  console.log('App running on port 3000');
});
