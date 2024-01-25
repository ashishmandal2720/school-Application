module.exports = (sequelize, DataTypes,) => {


    const user = sequelize.define('user', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        photo: {
            type: DataTypes.STRING,
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'parent', 
          },
    }, {
        // Other model options go here
        timestamps: true,
        underscored: true
    });
    return user
};
