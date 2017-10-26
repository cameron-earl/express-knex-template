const knex = require("../db/knex.js");
const encryption = require('../config/encryption.js');

module.exports = {
  index: function(req, res) {
    let message = {message: req.session.message};
    req.session.message = null;
    req.session.save(err=>{
      res.render('pages/index', message);
    });
  },
  //full example: galvanize/q2/projects/travelDash
}
