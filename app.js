var express = require('express');
var swig = require('swig');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

var models = require('./db');

var app = express();
module.exports = app;

var salespeopleRouter = require('./routes/salesPeople');
var regionsRouter = require('./routes/regions');
var salespersonRegionsRouter = require('./routes/salesPersonRegions');

app.engine('html', swig.renderFile);
swig.setDefaults({ cache: false });
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

app.use(morgan('dev'));
app.use(methodOverride('_method'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', function(req, res, next) {
	res.render('index', {tab: 'home'});
});

app.use('/salespeople', salespeopleRouter);
app.use('/regions', regionsRouter);
app.use('/salespersonregions', salespersonRegionsRouter);


app.use(function (err, req, res, next) {
    console.error(err);
    res.status(500).send(err.message);
});

//don't do this every time...

