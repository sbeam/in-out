
Lofties = new Meteor.Collection("lofties");

if (Meteor.is_client) {
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

}

if (Meteor.is_server) {

  Meteor.startup(function () {
    if (Lofties.find().count() === 0) {
      var names = ["Ada Lovelace",
                   "Grace Hopper",
                   "Marie Curie",
                   "Carl Friedrich Gauss",
                   "Nikola Tesla",
                   "Claude Shannon"];
      for (var i = 0; i < names.length; i++) {
        var here = (Math.random() > .50)? 'Y' : 'N';
        var inc = (here == 'Y')? 1 : 0;

        Lofties.insert({name: names[i], present: here, position: i, checkins: inc, score: 0});
      }
    }
  });

}
