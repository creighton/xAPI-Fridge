Meteor.subscribe("cart");
  
Template.cart.events({
  "drop .food-item": function (event) {
    // Check if space is available first
    // Add the item to cart, remove from either fridge or other cart spot
    console.log("cart item dropped");
    console.log("event next...");
    console.log(event);
    Meteor.call("addItem");
    Meteor.call("removeItem");
    // Make xAPI calls here 'Anon dropped food into cart'
    // Make xAPI calls here 'Anon took food from bin x in fridge
  },
});