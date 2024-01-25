module.exports = (sequelize, DataTypes,) => {
    const UserSchool = sequelize.define('UserSchool', {
        user_id: {
            type: DataTypes.STRING,
        },
        school_id: {
            type: DataTypes.STRING,
        },

        role: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    return UserSchool;
};


