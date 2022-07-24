const express = require('express');
require('dotenv').config();
const {API_PORT} = process.env;
const app = express();
const cors = require('cors');
const db = require('./src/configs/db');
const destinationRoute = require('./src/routes/destinations.js');
const transactionRoute = require('./src/routes/transactions.js');
const authRoute = require('./src/routes/auth.js');

app.use(cors({origin: '*'}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/destinations', destinationRoute);
app.use('/transactions', transactionRoute);
app.use('/auth', authRoute);


// run app if db function is success
db.connect((err) => {
  if (err) {
    console.log(err);
    return;
  }
  app.listen(API_PORT, () => {
    console.log(`Server is running on port ${API_PORT}`);
  },
  );
});
