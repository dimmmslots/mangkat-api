/* eslint-disable camelcase */
/* eslint-disable max-len */
const transactionController = {};
const connection = require('../configs/db');

transactionController.addTransaction = (req, res) => {
  const {destinationId, userId, quantity} = req.body;

  let price = 0;
  connection.query(`SELECT * FROM destinations WHERE id = ${destinationId}`, (err, results) => {
    if (err) {
      console.log(err);
      return;
    }
    price = results[0].price;
    const total = price * quantity;
    connection.query(`INSERT INTO transactions (destination_id, user_id, quantity, total) VALUES (${destinationId}, '${userId}', ${quantity}, ${total})`, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      res.json({
        message: 'Success',
        data: {
          results,
        },
      });
    },
    );
  },
  );
};

transactionController.getTransactions = (req, res) => {
  connection.query('SELECT * FROM transactions', (err, results) => {
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

transactionController.getTransactionById = (req, res) => {
  const {id} = req.params;
  connection.query(`SELECT * FROM transactions WHERE user_id = '${id}'`, (err, results) => {
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

transactionController.getTransactionByUserId = (req, res) => {
  const {id} = req.params;
  const TransactionByUserId = [];
  connection.query(`SELECT * FROM transactions WHERE user_id = '${id}'`, (err, results) => {
    if (err) {
      console.log(err);
      return;
    }
    // query select title from destinations
    const query = `SELECT id, title FROM destinations`;
    connection.query(query, (err, destination_results) => {
      if (err) {
        console.log(err);
        return;
      }
      // iterate through results and get the destination name
      results.forEach((result) => {
        TransactionByUserId.push({
          id: result.id,
          destination_id: result.destination_id,
          title: destination_results.find((destination) => destination.id === result.destination_id).title,
          quantity: result.quantity,
          total: result.total,
        });
      },
      );
      if (TransactionByUserId.length === 0) {
        res.json({
          message: 'No transaction found',
          data: null,
        });
      } else {
        res.json({
          message: 'Success',
          data: TransactionByUserId,
        });
      }
    },
    );
  },
  );
};

module.exports = transactionController;
