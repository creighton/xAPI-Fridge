Meteor.methods({
  addItem: function (text) {
    // Make sure the user is logged in before adding to fridge or cart
    console.log('addItem');
    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }
 
  },
  removeItem: function (text) {
    // Make sure the user is logged in before removing from fridge or cart
    console.log('removeItem')
    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }

  },
});