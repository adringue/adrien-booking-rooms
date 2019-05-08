const express = require('express'),
  mongoose = require('mongoose'),
  bodyParser = require('body-parser'),
  config = require('./config/dev'),
  Rental = require('./models/rental'),
  FakeDb = require('./fake-db'),
  rentalRoutes = require('./routes/rentals'),
  userRoutes = require('./routes/users');


mongoose.connect(config.DB_URI, {
    useNewUrlParser: true
  }).then(() => {
    console.log("connected to booking database");
    const fakeDb = new FakeDb()
    // fakeDb.seedDb();
  })
  .catch((err) => {
    console.log(err);
    console.log("Connection to booking database failed!");
  });
const app = express();
app.use(bodyParser.json());

// app.use((req, res, next) => {
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "Origin,X-Requested-With, Content-Type, Accept, Authorization"
//   );
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET,POST,PATCH,PUT,DELETE,OPTIONS"
//   );
//   next();
// });
app.use('/api/v1/rentals', rentalRoutes);
app.use('/api/v1/users', userRoutes);

////exple end
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log('App is running1');
})
