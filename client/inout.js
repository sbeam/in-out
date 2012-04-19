Lofties = new Meteor.Collection("lofties");

Template.hello.first = function() { return 'AAAAAAAA'; };
Template.hello.last = function() { return Session.get("lastname"); };

Template.hello.events = {
  'click button': function () {
      Session.set("lastname", 'ccclclclcllclickckc');
  }
};

Template.those_present.people = function () {
return Lofties.find({present: 'Y'}, {sort: {score: -1, checkins: -1}});
};

Template.those_absent.people = function () {
return Lofties.find({present: 'N'}, {sort: {score: -1, checkins: -1}});
};

Template.loftie_detail.events = {
  'click': function (e) {
      var here = Lofties.findOne(this._id).present;
      var inc = (here == 'Y')? 0 : 1;
      Lofties.update({_id:this._id}, {$inc: {checkins: inc}, $set: {present: (here == 'Y')? 'N':'Y'}});
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
            center__minWidth: 75,
            east__size: .40
        });
    });
});

//$(document).ready(function() { $( this ).on("DOMNodeInserted", "div#container", function() {
    //console.log($('#container').attr('id'));
//});
//});

