// This code only runs on the client.
Meteor.subscribe('thePlayers');

Template.leaderboard.helpers({
  // Helper functions go here.
  'player': function(){
    var currentUserId = Meteor.userId();
    return PlayersList.find({}, {sort: {score: -1, name: 1} });
  },
  'playerCount': function(){
    var currentUserId = Meteor.userId();
    return "Number of players: " + PlayersList.find({createdBy: currentUserId}).count();
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
    Meteor.call('modifyPlayerScore', selectedPlayer, 5);
  },
  'click .decrement': function(){
    var selectedPlayer = Session.get('selectedPlayer');
    Meteor.call('modifyPlayerScore', selectedPlayer, -5);
  },
  'click .remove': function(){
    var selectedPlayer = Session.get('selectedPlayer');
    if(confirm("Are you sure you want to remove " + PlayersList.findOne(selectedPlayer).name + "?")) {
      Meteor.call('removePlayerData', selectedPlayer);
    }
  }
});

Template.addPlayerForm.events({
  'submit form': function(event){
    event.preventDefault(); // Prevents the page from refreshing when the form is submitted
    var playerNameVar = event.target.playerName.value;
    var playerScoreVar = event.target.playerScore.value;
    Meteor.call('insertPlayerData', playerNameVar, playerScoreVar);
    var form = event.target;
    form.reset();
  }
});