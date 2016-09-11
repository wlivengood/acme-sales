var Sequelize = require('sequelize');
//don't hard code connection string
var db = new Sequelize('postgres://localhost:5432/acme_sales');

var Region = db.define('region', {
	region: {
		type: Sequelize.STRING,
		allowNull: false,
		unique: true,
		validate: {
			isNumeric: true,
			len: [5]
		}
	}
});

var Salesperson = db.define('salesperson', {
	name: {
		type: Sequelize.STRING,
		allowNull: false
	}
});

var SalespersonRegion = db.define('salesperson_region', {});

Region.hasMany(SalespersonRegion);
Salesperson.hasMany(SalespersonRegion);

SalespersonRegion.belongsTo(Region);
SalespersonRegion.belongsTo(Salesperson);

module.exports = {
  sync: function(){
    return db.sync({ force: true });
  },
  models: {
    Region: Region,
    Salesperson: Salesperson,
    SalespersonRegion: SalespersonRegion
  }
};
