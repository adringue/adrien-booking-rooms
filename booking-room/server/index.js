const express = require('express');
const mongoose = require('mongoose');
const config = require('./config/dev');
const Rental = require('./models/rental');
const FakeDb= require('./fake-db');
const rentalRoutes=require('./routes/rentals');


mongoose.connect(config.DB_URI, {
    useNewUrlParser: true
  }).then(() => {
    console.log("connected to booking database");
    const fakeDb= new FakeDb()
    fakeDb.seedDb();
  })
  .catch((err) => {
    console.log(err);
    console.log("Connection to booking database failed!");
  });
  const app = express();
  app.use('/api/v1/rentals', rentalRoutes);

////exple end
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log('App is running1');
})
