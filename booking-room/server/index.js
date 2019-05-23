const express = require('express'),
  mongoose = require('mongoose'),
  bodyParser = require('body-parser'),
  config = require('./config'),
  Rental = require('./models/rental'),
  FakeDb = require('./fake-db'),
  rentalRoutes = require('./routes/rentals'),
  userRoutes = require('./routes/users'),
  bookingRoutes = require('./routes/bookings'),
  path = require('path');
mongoose.connect(config.DB_URI, {
    useNewUrlParser: true
  }).then(() => {
    console.log("connected to booking database");
    if (process.env.NODE_ENV !== 'production') {
      const fakeDb = new FakeDb()
      // fakeDb.seedDb();
    }
  })
  .catch((err) => {
    console.log(err);
    console.log("Connection to booking database failed!");
  });
const app = express();
app.use(bodyParser.json());
app.use('/api/v1/rentals', rentalRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/bookings', bookingRoutes);
if (process.env.NODE_ENV === 'production') {
  const appPath = path.join(__dirname, '..', 'dist/booking-room');
  app.use(express.static(appPath));
  app.get('*', function (req, res) {
    res.sendFile(path.resolve(appPath, 'index.html'));
  });
}
////exple end
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log('App is running!');
})
