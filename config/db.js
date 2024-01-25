module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "11111111",
    DB: "equitySoft_app",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
      jwtSecret:'apple',
    }
  };