module.exports = (sequelize, DataTypes,) => {

  const classStudent = sequelize.define('classStudent', {
    classId: {
      type: DataTypes.STRING,
    },
    studentId: {
      type: DataTypes.STRING,
    }
  });

  return classStudent
};