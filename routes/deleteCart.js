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

// Mongoose imports
var mongoose = require('mongoose');
var Cart = mongoose.model('Cart');

// Route handling function
function cart(req, res) {
  Cart.findOne({'username' : req.session.username}, function(err, cart) {
    if(cart) {
        // Send the cart
        cart.remove(function(err1, cart) {
           if (err1) {
            // Server error
            res.send(500);
           } else {
            // Return success
            res.send('{"success":true}');
           }
        });
      } else {
        // Could not find the cart
        res.send(404);
      }
  });
}

// Export the route association function
module.exports = function(app) {
  app.delete('/cart', cart);
};