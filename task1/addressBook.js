module.exports = (sequelize, DataTypes) => {
    const AddressBook = sequelize.define('AddressBook', {
            firstname: DataTypes.STRING,
            lastname: DataTypes.STRING,
            address: DataTypes.STRING,
            phoneNumber: {
                type: DataTypes.STRING,
                validate: {
                    is: {
                        args: [/[0-9]{3}\/[0-9]{3}\-[0-9]{3}/],
                        msg: 'Invalid phone number format'
                    }
                }
            }
        }, {
            freezeTableName: true
        }
    );

    return AddressBook;
};