const express = require('express');
const bodyParser = require('body-parser');
const { sequelize } = require('./models');
const models = require('./models')

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Routes pour les chambres
const roomsRouter = require('./routes/rooms');
app.use('/api', roomsRouter);

// Routes pour les réservations
const bookingsRouter = require('./routes/booking');
app.use('/api', bookingsRouter);

// Routes pour les utilisateurs
const usersRouter = require('./routes/user');
app.use('/api', usersRouter);

// Routes pour les hotels
const hotelRouter = require('./routes/hotel');
app.use('/api', hotelRouter);

sequelize.authenticate()
  .then(() => {
    console.log('Connection to the database has been established successfully.');
    return sequelize.sync();
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});