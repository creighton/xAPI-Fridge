// Tasks = new Mongo.Collection("tasks");
Fridge = new Mongo.Collection("fridge");
Cart = new Mongo.Collection("cart");

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish("fridge", function () {
    return Fridge.find();
  });
  Meteor.publish("cart", function () {
    return Cart.find();
  });  
}
 
if (Meteor.isClient) {
  // This code only runs on the client
  Meteor.subscribe("fridge");
  Meteor.subscribe("cart");
 
  Template.fridge.events({
    "drop .food-item": function () {
      // Check if space is available first
      // Add the item to fridge, remove from either cart or other fridge spot
      Meteor.call("addItem");
      Meteor.call("removeItem");
      // Make xAPI calls here 'Anon dropped food into bin x in fridge'
      // Make xAPI calls here 'Anon took food from cart'
    },
  });

  Template.cart.events({
    "drop .food-item": function () {
      // Check if space is available first
      // Add the item to cart, remove from either fridge or other cart spot
      Meteor.call("addItem");
      Meteor.call("removeItem");
      // Make xAPI calls here 'Anon dropped food into cart'
      // Make xAPI calls here 'Anon took food from bin x in fridge
    },
  });

  Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
  });  
}
 
Meteor.methods({
  addItem: function (text) {
    // Make sure the user is logged in before adding to fridge or cart
    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }
 
  },
  removeItem: function (text) {
    // Make sure the user is logged in before removing from fridge or cart
    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }

  },
});