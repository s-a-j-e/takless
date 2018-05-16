const Sequelize = require('sequelize');

// options for local database
const options = {
  dialect: 'postgres',
  dialectOptions: {
    dialectModulePath: 'pg',
    trustedConnection: true,
  },
  host: 'localhost',
  database: 'test',
};

const dbPath = process.env.DATABASEURL || options;
const sequelize = new Sequelize(dbPath);

sequelize.authenticate()
  .then(() => {
    console.log('successfully connected to db');
  })
  .catch((err) => {
    console.error(err);
  });

const User = sequelize.define('user', {
  username: {
    type: Sequelize.STRING,
    unique: true,
  },
  password: {
    type: Sequelize.STRING,
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
  },
  googleID: {
    type: Sequelize.STRING,
    unique: true,
  },
});

const Game = sequelize.define('game', {
  player1: {
    type: Sequelize.STRING,
  },
  player1_id: {
    type: Sequelize.INTEGER,
  },
  player2: {
    type: Sequelize.STRING,
  },
  player2_id: {
    type: Sequelize.INTEGER,
  },
  board_state: {
    // TODO: Not 100% sure if boardState will be JSON
    type: Sequelize.JSON,
  },
  ptn: {
    type: Sequelize.STRING,
  },
  victor: {
    type: Sequelize.STRING,
  },
  win_type: {
    type: Sequelize.STRING,
  },
  board_size: {
    type: Sequelize.INTEGER,
  },
  ranked: {
    type: Sequelize.BOOLEAN,
  },
});

// Game.hasMany(User, { foreignKey: 'player1_id', sourceKey: 'id' });
// Game.hasMany(User, { foreignKey: 'player2_id', sourceKey: 'id' });

// to drop table if exists, pass { force: true } as argument in User.sync
User.sync()
  .then(() => {
    console.log('user table created');
  });

Game.sync()
  .then(() => {
    console.log('game table created');
  });

module.exports = {
  Sequelize,
  sequelize,
  User,
  Game,
};
