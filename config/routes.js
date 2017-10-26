const main = require("../controllers/main.js");

module.exports = function(app){

  app.get('/', main.index);

  // app.get('/login', main.renderLogin);

  // app.post('/login', main.login);

  app.use(userAuth);

}

function userAuth(req,res,next){
  if(req.session.admin){
    next();
  }else{
    req.session.message = "You are not authorized to view that page.";
    req.session.save(err => {
      res.redirect('/');
    })
  }
}
