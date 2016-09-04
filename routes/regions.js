var express = require('express');
var router = express.Router();
var models = require('../db');
var Region = models.Region;
var Salesperson = models.Salesperson;
var SalespersonRegion = models.SalespersonRegion;

router.get('/', function(req, res, next) {
	var regions, salespeople;
	return Region.findAll()
	.then(function(r) {
		regions = r;
		return Salesperson.findAll();
	})
	.then(function(s) {
		salespeople = s;
		return SalespersonRegion.findAll();
	})
	.then(function(salespersonRegions) {
		res.render('regions', {regions: regions, salespeople: salespeople, 
			salesPersonRegions: salespersonRegions, tab: 'regions'});
	})
	.catch(next);
});

router.post('/', function(req, res, next) {
	return Region.create({region: req.body.region})
	.then(function() {
		res.redirect('/regions');
	})
	.catch(next);
});

router.delete('/:id', function(req, res, next) {
	return Region.findById(Number(req.params.id))
	.then(function(region) {
		return region.destroy();
	})
	.then(function() {
		res.redirect('/regions');
	})
	.catch(next);
});

module.exports = router;