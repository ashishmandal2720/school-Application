module.exports = (sequelize, DataTypes,) => {

    const student = sequelize.define('student', {
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        photo: {
          type: DataTypes.STRING,
        },
        school_id: {
          type: DataTypes.STRING,
        },
      });

return student
};

