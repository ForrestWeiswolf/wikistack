var Sequelize = require('sequelize');
var db = new Sequelize('postgres://localhost:5432/wikistack');

var Page = db.define('page', {
    title: { type: Sequelize.STRING, allowNull: false },
    urlTitle: { type: Sequelize.STRING, allowNull: false },
    content: { type: Sequelize.STRING, allowNull: false },
    status: { type: Sequelize.ENUM('open', 'closed'), defaultValue: 'open'},
    date: { type: Sequelize.DATE }//,
    // get() {
    //   const title = this.getDataValue('urlTitle');
    //   return '/wiki/' + title
    // }
});

var User = db.define('user', {
    name: { type: Sequelize.STRING, allowNull: false },
    email: { type: Sequelize.STRING, allowNull: false, validate: { isEmail: true } }
});

module.exports =  {
  db: db,
  Page : Page,
  User : User
}
