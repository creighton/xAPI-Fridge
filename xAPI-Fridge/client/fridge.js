Meteor.subscribe("fridge");

Template.fridge.events({
  "drop .food-item": function () {
    // Check if space is available first
    // Add the item to fridge, remove from either cart or other fridge spot
    console.log("fridge item dropped");
    console.log("event next...");
    console.log(event);
    Meteor.call("addItem");
    Meteor.call("removeItem");
    // Make xAPI calls here 'Anon dropped food into bin x in fridge'
    // Make xAPI calls here 'Anon took food from cart'
  },
});