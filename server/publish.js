Meteor.publish("lofties", function () {
});

Meteor.publish("those_present", function () {
  return Lofties.find({present: 'Y'}, {sort: {score: -1, checkins: -1}});
});

Meteor.publish("those_absent", function () {
  return Lofties.find({present: 'N'}, {sort: {score: -1, checkins: -1}});
});

