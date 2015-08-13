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