/*
    ArrowFoodAppREST
    Copyright © 2014 Ian Zachary Ledrick, also known as Thisita.
    
    This file is part of ArrowFoodAppREST.

    ArrowFoodAppREST is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    ArrowFoodAppREST is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with ArrowFoodAppREST.  If not, see <http://www.gnu.org/licenses/>.
*/
'use strict';

var mongoose = require('mongoose');

// This is a schema for reseting passwords in the usual way
// Nothing fancy, just a short time token
var passwordResetSchema = new mongoose.Schema({
  username: String,
  token: String,
  expiration: { type: Date, default: Date.now },
  created: { type: Date, default: Date.now }
});

// Export the schema
var PasswordReset = module.exports = mongoose.model('PasswordReset', passwordResetSchema);