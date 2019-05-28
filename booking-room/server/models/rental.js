const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const rentalSchema = new Schema({
title: {type: String, require: true, max: [128, 'too long, max is 128 characters']},
country: {type: String, require: true, lowercase: true},
city: {type: String, require: true, lowercase: true},
street: {type: String, require: true, min: [4, 'too short, min is 4 characters']},
category: {type: String, require: true, lowercase: true},
image: {type: String, require: true},
bedrooms: Number,
shared: Boolean,
description: {type: String, require: true},
dailyRate: Number,
createdAt: {type: String, default: Date.now()},
user:{
  type: Schema.Types.ObjectId, ref: 'User'
},
bookings: [{type: Schema.Types.ObjectId, ref: 'Booking'}]
});
module.exports= mongoose.model('Rental', rentalSchema);
