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
var Menu = mongoose.model('Menu');

// j0nnyD:
/*
 * You need to: findOne() the user's cart
 * Update the schema buy adding a cart item.
 * The req.body will contain json with options.
 *
 * You need to CHECK FIRST if a similar item already exists
 * This will be the case that you just add to the quantity in cart
 *
 * You need to DEEP CHECK the options to make sure that
 * you really need to make a new item instance in the cart
 *
 * And then of course save the data
 * This function is going to be very deep.
 * If you feel the need, you can separate everything out into helper functions.
 * If you do, and your function returns something, you MUST instead require a callback
 * Functions that return data are blocking, and that is not allowed in this case.
 * 
 * For item information, it will be passed as req.params. things proceeded by a :
 * if you run into trouble, message me
 */
// Route handling function
function cart(req, res) {
	// Boolean for 
	var added = false;
	// Check if the user is signed in
	if(req.session.authenticated) {
		Cart.findOne({'username' : req.session.username}, function(err, cart) {
			if(cart) {
				// Check that the menu exists
				var json = JSON.parse(req.body);
				Menu.findOne({'restaurant' : req.params.restaurant, 'name' : req.params.menu}, function(err, menu){
					if(menu) {
						for (var i = 0; i < menu.items.length; ++i) {
							// Check that the item actually exists in the menu
							if(menu.items[i].name == req.params.item) {
								for (var j = 0; j < cart.items.length; ++j) {
									// Check if that item is already in the cart
									if(cart.items[j] == req.params.item) {
										// Increment the quantity
										cart.items[i].quantity += req.params.quantity;
										
										// Set boolean to true to escape the other for loop
										addded = true;
										break;
									}
								}
								// Break out if the item was incremented
								if (added) {
									break;
								} else {
									// If the item was not found in the cart add a new one
									var json = JSON.parse(req.body);
									cart.items.push({
										restaurant: req.params.restaurant,
										menu: req.params.menu,
										options: req.params.options,
										quantity: json});
								}
							}
						}
					} else {
						// Item not found
						res.send(404);
					}
				});
				// Check if there is already an instance of the item in the cart
				
				// Add to the cart
				
				// Else increment the quantity of the item
			} else {
				// Could not find the cart
				res.send(404);
			}
		});
	// Else not signed in, use the cart in the request
	} else {
		if(req.session.cart){
		
		} else {
			// Could not find the cart
			res.send(404);
		}
	}
  var quantity = parseInt(req.params.quantity);
  if(!isNaN(quantity)) {
    if(req.params.menuId == menuId
      && req.params.itemId == itemId) {
      res.send(JSON.stringify(response));
    } else {
      res.send(404);
    }
  } else {
    res.send(400);
  }
}

// Export the route association function
module.exports = function(app) {
  app.post('/cart/:restaraunt/:menu/:item/:quantity', cart);
};