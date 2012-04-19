Lofties = new Meteor.Collection("lofties");

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

