/* eslint-disable max-len */
const destinationControllers = {};
const connection = require('../configs/db');

destinationControllers.getDestinations = (req, res) => {
  connection.query('SELECT * FROM destinations', (err, results) => {
    if (err) {
      console.log(err);
      return;
    }
    res.json({
      message: 'Success',
      data: results,
    });
  });
};

destinationControllers.getDestinationById = (req, res) => {
  const {id} = req.params;
  // eslint-disable-next-line max-len
  connection.query(`SELECT * FROM destinations WHERE id = ${id}`, (err, results) => {
    if (err) {
      console.log(err);
      return;
    }
    res.json({
      message: 'Success',
      data: results,
    });
  },
  );
};

destinationControllers.getDestinationByName = (req, res) => {
  const {name} = req.params;
  // eslint-disable-next-line max-len
  if (name === 'undefined') {
    connection.query('SELECT * FROM destinations', (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      res.json({
        message: 'Success',
        data: results,
      });
    },
    );
  } else {
    connection.query(`SELECT * FROM destinations WHERE title LIKE '%${name}%'`, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      res.json({
        message: 'Success',
        data: results,
      });
    },
    );
  }
};

module.exports = destinationControllers;

