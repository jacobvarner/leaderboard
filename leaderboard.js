PlayersList = new Mongo.Collection('players');

if(Meteor.isClient){
  // This code only runs on the client.
  Template.leaderboard.helpers({
    // Helper functions go here.
    'player': function(){
      return PlayersList.find({}, {sort: {score: -1, name: 1} });
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
    }, 
    'showSelectedPlayer': function(){
      var selectedPlayer = Session.get('selectedPlayer');
      return PlayersList.findOne(selectedPlayer);
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
    },
    'click .increment': function(){
      var selectedPlayer = Session.get('selectedPlayer');
      PlayersList.update(selectedPlayer, {$inc: {score: 5} });
    },
    'click .decrement': function(){
      var selectedPlayer = Session.get('selectedPlayer');
      PlayersList.update(selectedPlayer, {$inc: {score: -5} });
    },
    'click .remove': function(){
      var selectedPlayer = Session.get('selectedPlayer');
      if(confirm("Are you sure you want to remove " + PlayersList.findOne(selectedPlayer).name + "?")) {
        PlayersList.remove(selectedPlayer);
      }
    }
  });

  Template.addPlayerForm.events({
    'submit form': function(event){
      event.preventDefault(); // Prevents the page from refreshing when the form is submitted
      var playerNameVar = event.target.playerName.value;
      var playerScoreVar = event.target.playerScore.value;
      PlayersList.insert({
        name: playerNameVar,
        score: parseInt(playerScoreVar)
      });
      var form = event.target;
      form.reset();
    }
  });
}

if(Meteor.isServer){
  // This code only runs on the server.
}