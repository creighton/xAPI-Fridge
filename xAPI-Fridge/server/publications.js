Meteor.publish("fridge", function () {
    return Fridge.find();
  });
  Meteor.publish("cart", function () {
    return Cart.find();
  });