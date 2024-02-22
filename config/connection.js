const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;



if (process.env.JAWSDB_URL) {
    sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
    //This is where the problem was (arguments password)
    sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, '', {
        host: 'localhost',
        dialect: 'mysql',
        port: 3306,
        logging: false
    });
}

module.exports = sequelize;