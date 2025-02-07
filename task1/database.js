const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('wt_lab10', 'root', 'password', {
    host: 'localhost',
    dialect: 'mysql'
});

const database = {};

database.Sequelize = Sequelize;
database.sequelize = sequelize;

database.AddressBook = require('./addressBook')(sequelize, Sequelize.DataTypes);

(async () => {
    try {
        await sequelize.authenticate();
        console.log('Successfully connected to the database');

        await sequelize.sync({ force: true });
        console.log('Tables successfully synchronized');

        await database.AddressBook.create({
            firstname: 'Jane',
            lastname: 'Doe',
            address: 'Somewhere 1a',
            phoneNumber: '123/456-789'
        });
    } catch (error) {
        console.error('Error during database setup:', error);
    }
})();

module.exports = database;