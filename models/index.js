const dbConfig = require("../config/db");
const { Sequelize, DataTypes, Models } = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

try {
  sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require('./user')(sequelize, DataTypes); 
db.School = require('./school')(sequelize, DataTypes); 
db.Student = require('./student')(sequelize, DataTypes); 
db.ClassStudent = require('./classStudent')(sequelize, DataTypes);
db.UserSchool = require('./userSchool')(sequelize, DataTypes);
db.Class = require("./class")(sequelize, DataTypes);


db.Class.belongsToMany(db.Student, {
  through: {
    model: 'ClassStudents'
  },
  foreignKey: 'classId'
}),

  db.Student.belongsToMany(db.Class, {
    through: {
      model: 'ClassStudents'
    },
    foreignKey: 'studentId',

  });

db.User.belongsToMany(db.School, {
  through: 'UserSchool',
  foreignKey: 'user_id',
});
db.School.belongsToMany(db.User, {
  through: 'UserSchool',
  foreignKey: 'school_id',
});



db.DataTypes = DataTypes;
db.sequelize.sync({ force: false });
module.exports = db;