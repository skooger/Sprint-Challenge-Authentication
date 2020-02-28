const router = require('express').Router();
const bcrypt = require('bcryptjs');
const middleware = require('./authenticate-middleware')

const db = require('./auth-model');

router.get('/users', middleware, (req, res) => {

  db.getUsers()
      .then(users => {
          res.status(200).json(users)
      })
      .catch(err => {
          res.status(500).json({error: "Could not get users"})
      })
})

router.post('/register', (req, res) => {
  // implement registration
  console.log(req.body)
  if(!req.body || !req.body.username || !req.body.password){
    res.status(400).json({error: "Username and password are both required."})
  }
  else{
    let hashedPassword = bcrypt.hashSync(req.body.password, 14);
    req.body.password = hashedPassword;

    req.session.isLoggedIn = true;
    req.session.username = req.body.username;
    console.log('Here is your register session', req.session);

    db.addUser(req.body)
      .then(user => {
          res.status(200).json(user)
      })
      .catch(err => {
        res.status(500).json({error: 'Could not add user.'})
      })


  }
});

router.post('/login', (req, res) => {
  // implement login
  if (!req.body || !req.body.username || !req.body.password){ 
    res.status(400).json({error: "Username and password are both required."})
  }
  else{

      db.getUserByUsername(req.body.username)
          .then(databaseInfo => {
              if (databaseInfo && bcrypt.compareSync(req.body.password, databaseInfo.password))
                  {
                      req.session.isLoggedIn = true;
                      req.session.username = req.body.username;
                      console.log('Here is your login session', req.session)
                      res.status(200).json(databaseInfo.username)
                  }
              else
                  { res.status(401).json({ error: "Invalid Credentials."})}
          })
          .catch(error => { res.status(401).json({ error: "You shall not pass."})})
  }

});

module.exports = router;
