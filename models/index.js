var Sequelize = require('sequelize');
var db = new Sequelize('postgres://localhost:5432/wikistack');

db.sync(function(err) {
  if err throw err

  db.define('Page', {
    title: Sequelize.STRING,
    urlTitle: Sequelize.STRING,
    content: Sequelize.TEXT,
    status: Sequelize.BOOLEAN
  });

  db.define('User', {
    name: Sequelize.STRING,
    email: {type: Sequelize.STRING, unique: true}
  });
});
