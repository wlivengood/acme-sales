var express = require('express');
var router = express.Router();
var models = require('../db');
var Salesperson = models.Salesperson;
var Region = models.Region;
var SalespersonRegion = models.SalespersonRegion;

router.post('/:salesPersonId/:regionId', function(req, res, next) {
	return SalespersonRegion.create({
		salespersonId: req.params.salesPersonId,
		regionId: req.params.regionId
	})
	.then(function() {
		res.redirect('/' + req.query._backurl);
	})
	.catch(next);
});

router.delete('/:salesPersonId/:regionId', function(req, res, next) {
	return SalespersonRegion.findOne({
		where: {
			salespersonId: req.params.salesPersonId,
			regionId: req.params.regionId
		}
	})
	.then(function(salespersonRegion) {
		return salespersonRegion.destroy();
	})
	.then(function() {
		res.redirect('/' + req.query._backurl);
	})
	.catch(next);
})



module.exports = router;