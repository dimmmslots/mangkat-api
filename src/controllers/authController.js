/* eslint-disable prefer-const */
/* eslint-disable max-len */
const authController = {};

const connection = require('../configs/db');
const bcrypt = require('bcrypt');

authController.register = (req, res) => {
  let {username, password} = req.body;
  //   trim username and lowercase username
  username = username.replace(/\s/g, '').toLowerCase();
  //   generate salt and hash password
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      console.log(err);
      return;
    }
    // check if username already exists
    connection.query(`SELECT * FROM users WHERE username = '${username}'`, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (results.length > 0) {
        res.json({
          message: 'Username already exists',
          error: true,
          data: null,
        });
        return;
      }
      // insert new user into database
      connection.query(`INSERT INTO users (username, password) VALUES ('${username}', '${hash}')`, (err, results) => {
        if (err) {
          console.log(err);
          return;
        }
        res.json({
          message: 'Success',
          error: false,
          data: results,
        });
      },
      );
    },
    );
  },
  );
};

authController.login = (req, res) => {
  let {username, password} = req.body;
  //   trim username and lowercase username
  username = username.replace(/\s/g, '').toLowerCase();
  //   check if username exists
  connection.query(`SELECT * FROM users WHERE username = '${username}'`, (err, results) => {
    if (err) {
      console.log(err);
      return;
    }
    if (results.length === 0) {
      res.json({
        message: 'Username or password is incorrect',
        error: true,
      });
      return;
    }
    //   compare password with hash
    bcrypt.compare(password, results[0].password, (err, result) => {
      if (err) {
        console.log(err);
        return;
      }
      if (result) {
        res.json({
          message: 'Success',
          id: results[0].user_id,
          error: false,
        });
      } else {
        res.json({
          message: 'Username or password is incorrect',
          error: true,
        });
      }
    },
    );
  },
  );
};


module.exports = authController;

