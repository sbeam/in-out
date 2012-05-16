Lofties = new Meteor.Collection("lofties");

// TODO is this the right way to attach this? probably not.
Meteor.subscribe('those_absent', function() {
    $( "li.ui-draggable" ).draggable( { revert: "invalid" } );
});
Meteor.subscribe('those_present', function() {
    $( "li.ui-draggable" ).draggable( { revert: "invalid" } );
});




Template.hello.greet = function() { return Session.get('greet'); };

Template.hello.events = {
  'click button': function (e) {
      Session.set("greet", $('#username').val());
  }
};

Template.those_present.people = function () {
    return Lofties.find({present: 'Y'}, {sort: {score: -1, checkins: -1}});
};

Template.those_absent.people = function () {
    return Lofties.find({present: 'N'}, {sort: {score: -1, checkins: -1}});
};

Template.loftie_detail.events = {
  'inout.enter': function (e) {
      Lofties.update({_id:this._id}, {$inc: {checkins: 1}, $set: {present: 'Y' }});
  },
  'inout.leave': function (e) {
      Lofties.update({_id:this._id}, {$set: {present: 'N' }});
  }
};


Meteor.startup(function () {

    $( function() {
        var lay = $('body').layout({
            name: 'outerLayout',
            autoResize: true,
            applyDefaultStyles: true,
            livePaneResizing: true,
            closable: false,
            showDebugMessages:true,
            center__minWidth: 75
        });

        $( "#c_present .inner-drop" ).droppable({
            //activeClass: "ui-state-highlight",
            accept: "#c_absent li",
            drop: function( event, ui ) {
                ui.draggable.trigger('inout.enter');
            }
        });
        $( "#c_absent .inner-drop" ).droppable({
            //activeClass: "ui-state-highlight",
            accept: "#c_present li",
            drop: function( event, ui ) {
                ui.draggable.trigger('inout.leave');
            }
        });
    });

});


//$(document).ready(function() { $( this ).on("DOMNodeInserted", "div#container", function() {
    //console.log($('#container').attr('id'));
//});
//});


