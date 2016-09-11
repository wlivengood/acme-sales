var express = require('express');
var router = express.Router();
var models = require('../db');
var Salesperson = models.Salesperson;
var Region = models.Region;
var SalespersonRegion = models.SalespersonRegion;

/* 
 * see my comments on salesPeople.. it's just the inverse
 */

router.get('/', function(req, res, next) {
	var salespeople, regions;
	return Salesperson.findAll()
	.then(function(results) {
		salespeople = results;
		return Region.findAll();
	})
	.then(function(results) {
		regions = results;
		return SalespersonRegion.findAll();
	})
	.then(function(salespersonRegions) {
		res.render('salesPeople', {salespeople: salespeople, regions: regions, 
			salesPersonRegions: salespersonRegions, tab: 'salespeople'});
	})
	.catch(next);
});

router.post('/', function(req, res, next) {
	return Salesperson.create({
		name: req.body.name
	})
	.then(function() {
		res.redirect('/salespeople');
	})
	.catch(next);
});

router.delete('/:id', function(req, res, next) {
	return Salesperson.findById(Number(req.params.id))
	.then(function(salesperson) {
		return salesperson.destroy();
	})
	.then(function() {
		res.redirect('/salespeople');
	})
	.catch(next);
});

module.exports = router;
