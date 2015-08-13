// Tasks = new Mongo.Collection("tasks");
Fridge = new Mongo.Collection("fridge");
Cart = new Mongo.Collection("cart");

if (Meteor.isServer) {
  // This code only runs on the server  
}
 
if (Meteor.isClient) {
  // This code only runs on the client
  Meteor.subscribe("fridge");
  Meteor.subscribe("cart");
  
  Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
  });  
}