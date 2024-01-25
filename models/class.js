module.exports = (sequelize, DataTypes,) => {

    const Class = sequelize.define('Class', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        school_id: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        // Other model options go here
        timestamps: true,
        // underscored: true
    });
    return Class
};
