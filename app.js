var express = require('express');
var swig = require('swig');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

var models = require('./db');
var Region = models.Region;
var Salesperson = models.Salesperson;
var SalespersonRegion = models.SalespersonRegion;

var app = express();
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

app.use('/salespeople', salespeopleRouter);
app.use('/regions', regionsRouter);
app.use('/salespersonregions', salespersonRegionsRouter);

app.get('/', function(req, res, next) {
	res.render('index', {tab: 'home'});
});

app.use(function (err, req, res, next) {
    console.error(err);
    res.status(500).send(err.message);
});

Region.sync({force: true})
    .then(function () {
        return Salesperson.sync({force: true});
    })
	.then(function () {
		return SalespersonRegion.sync({force: true});
	})
    .then(function () {
        app.listen(3000, function () {
            console.log('Server is listening on port 3000');
        });
    });