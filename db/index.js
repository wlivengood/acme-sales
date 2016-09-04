var Sequelize = require('sequelize');
var db = new Sequelize('postgres://localhost:5432/acme_sales');

var Region = db.define('region', {
	region: {
		type: Sequelize.STRING,
		allowNull: false,
		unique: true
	}
});

var Salesperson = db.define('salesperson', {
	name: {
		type: Sequelize.STRING,
		allowNull: false,
	}
});

var SalespersonRegion = db.define('salesperson_region', {});

Region.hasMany(SalespersonRegion);
Salesperson.hasMany(SalespersonRegion);
SalespersonRegion.belongsTo(Region);
SalespersonRegion.belongsTo(Salesperson);

module.exports = {
	Region: Region,
	Salesperson: Salesperson,
	SalespersonRegion: SalespersonRegion
};