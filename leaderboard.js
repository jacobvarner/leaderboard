PlayersList = new Mongo.Collection('players');

if(Meteor.isClient){
  // This code only runs on the client.
  Template.leaderboard.helpers({
    // Helper functions go here.
    'player': function(){
      return PlayersList.find();
    },
    'playerCount': function(){
      return "Number of players: " + PlayersList.find().count();
    },
    'selectedClass': function(){
      var playerId = this._id;
      var selectedPlayer = Session.get('selectedPlayer');
      if(playerId == selectedPlayer){
        return "selected";
      }
    }
  });

  Template.leaderboard.events({
    // Event functions go here.
    'click .player': function(){
      var playerId = this._id;
      Session.set('selectedPlayer', playerId);
    },
    'dblclick .player': function(){
      console.log("You double clicked a .player element.");
    }
  });
}

if(Meteor.isServer){
  // This code only runs on the server.
}