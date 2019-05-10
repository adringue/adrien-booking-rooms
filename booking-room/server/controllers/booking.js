const Booking = require('../models/booking');
const Rental = require('../models/rental');
const User = require('../models/user');
const MongooseHelpers = require('../helpers/mongoose');
const moment = require('moment');
exports.createBooking = function (req, res) {
  const {
    startAt,
    endAt,
    totalPrice,
    guests,
    days,
    rental
  } = req.body;
  const user = res.locals.user;
  const booking = new Booking({
    startAt,
    endAt,
    totalPrice,
    guests,
    days
  });
  // sans populate on ne verra pas bookings and user apparaitre dans le found rental
  Rental.findById(rental._id)
    .populate('bookings')
    .populate('user')
    .exec(function (err, foundRental) {
      if (err) {
        return res.status(422).send({
          errors: MongooseHelpers.normalizeErrors(err.errors)
        });
      }
      if (foundRental.user.id === user.id) {
        return res.status(422).send({
          errors: [{
            title: 'Invalid User!',
            detail: 'Cannot create booking on your Rental!!!'
          }]
        });
      }
      if (isValidBooking(booking, foundRental)) {
        // console.log("testvrai:","vrai");
        booking.user = user;
        booking.rental = foundRental;
        foundRental.bookings.push(booking);
        booking.save(function (err) {
          if (err) {
            return res.status(422).send({
              errors: normalizeErrors(err.errors)
            });
          }
          foundRental.save();
          User.update({
            _id: user.id
          }, {
            $push: {
              bookings: booking
            }
          },function(){});
          return res.json({
            startAt: booking.startAt,
            endAt: booking.endAt
          });
        });
        // update rental and user

      } else {
        return res.status(422).send({
          errors: [{
            title: 'Invalid Boking!',
            detail: 'Choosen dates are already taken!!!'
          }]
        });
      }
      // return res.json({booking,foundRental});
    });
};

function isValidBooking(proposedBooking, rental) {
  let isValid = false;
  // console.log("proposed:",proposedBooking);
  // console.log("rentalBoo:",rental.bookings);
  if (rental.bookings && rental.bookings.length > 0) {
    // every will return only within every, muss man return value zum local variable zuweisen!
    isValid = rental.bookings.every(function (booking) {
      // moment convert string date into moment date
      const proposedStart = moment(proposedBooking.startAt);
      const proposedEnd = moment(proposedBooking.endAt);
      const actualStart = moment(booking.startAt);
      const actualEnd = moment(booking.endAt);
      // if ((actualStart < proposedStart && actualEnd < proposedStart) || (proposedEnd < actualEnd && proposedEnd < actualStart)) {
      //   return true;
      // } else {
      //   return false;
      // }
      // if above is the same as the following
      // console.log("result:", ((actualStart < proposedStart && actualEnd < proposedStart) || (proposedEnd < actualEnd && proposedEnd < actualStart)));
      return ((actualStart < proposedStart && actualEnd < proposedStart) || (proposedEnd < actualEnd && proposedEnd < actualStart));
    });
    if (isValid) {
      return isValid;
    }
  } else if (rental.bookings.length == 0) {
    return true;
  }
}
