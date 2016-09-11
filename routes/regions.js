var express = require('express');
var router = express.Router();
var models = require('../db');
var Region = models.Region;
var Salesperson = models.Salesperson;
var SalespersonRegion = models.SalespersonRegion;
var Promise = require('bluebird');

router.get('/', function(req, res, next) {
  /* see if you can get it work this way 
   * you can have an instance method on region - region.hasSalesPerson(salesPersonId)
   * */

  Promise.all([
      Region.findAll({ include: [ SalesPersonRegion ] }),
      SalesPerson.findAll()
  ])
  .spread(function(regions, salesPeople){
		res.render('regions', {regions: regions, salespeople: salespeople, tab: 'regions'});
	})
  .catch(next);
  /*
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
  */
});

router.post('/', function(req, res, next) {
	return Region.create({region: req.body.region})
	.then(function() {
		res.redirect('/regions');
	})
	.catch(next);
});

router.delete('/:id', function(req, res, next) {
  SalesPersonRegion.destroy({
    where: { id: req.params.id }
  })
  .then(function(){
    return Region.destroy({ where: { id: req.param.id } });
  
  })
	.then(function() {
		res.redirect('/regions');
	})
	.catch(next);
});

module.exports = router;
