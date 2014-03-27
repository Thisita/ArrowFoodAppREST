/*
    ArrowFoodAppDummyREST
    Copyright © 2014 Ian Zachary Ledrick, also known as Thisita.
    
    This file is part of ArrowFoodAppDummyREST.

    ArrowFoodAppDummyREST is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    ArrowFoodAppDummyREST is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with ArrowFoodAppDummyREST.  If not, see <http://www.gnu.org/licenses/>.
*/
'use strict';

var mongoose = require('mongoose');

// A schema for address
// They get a nickname for user search purposes
var addressSchema = new mongoose.Schema({
  name: String,
  line1: String,
  line2: String,
  city: String,
  state: String,
  zip: String
});

// A schema for phone/fax
// Gets a name for user search eg "Fax", "Carryout", "Headquarters"
var phoneSchema = new mongoose.Schema({
  name: String,
  number: String
});

// A schema for email
var emailSchema = new mongoose.Schema({
  name: String,
  address: String
});

// The restaurant schema
// Picture is base64 encoded
var restaurantSchema = new mongoose.Schema({
  name: String,
  picture: String,
  description: String,
  tags: [String],
  emails: [emailSchema],
  phones: [phoneSchema],
  addresses: [addressSchema],
  createdOn: Date,
  lastUpdated: Date
});

// Export the schema
var Restaurant = module.exports = mongoose.model('Restaurant', restaurantSchema);