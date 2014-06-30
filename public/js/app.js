App = Ember.Application.create();

App.Store = DS.Store.extend();

App.Router.map(function() {
  this.resource("rides", function() {
    this.resource("ride", { path: ":id" });
  });
  this.resource("auth");
  this.resource("index");
  this.resource("profile");
});

App.ApplicationAdapter = DS.RESTAdapter.extend({
  namespace: 'api'
});

App.AuthRoute = Ember.Route.extend({
  // redirect: function() {
  //   window.location.replace("https://www.strava.com/oauth/authorize?client_id=1437&response_type=code&redirect_uri=http://localhost:3000/auth&scope=write&state=mystate&approval_prompt=force");
  // }
});

App.RidesView = Ember.View.extend({
  didInsertElement: function () {
    var d = [[1,2], [2,6]];
    //var e = gen();

    var convertMetersPerSecondToMph = 2.23694;
    var d2 = [[0,0]];
    var model = this.get('controller.model');

    for(var i=0;i<model.length;i++){
        var ride = model[model.length - i - 1]; // Strava gives us this in reverse order
        console.log('PUSHING: ' + ride.start_date + ' ' + ride.average_speed);
        // d2.push([ride.start_date, ride.average_speed]);
        d2.push([i, ride.average_speed * convertMetersPerSecondToMph]);
    }
    console.log(d2);

    $.plot("#placeholder", [d2], {
      xaxis: { mode: "time" }
    });
  }
});

App.RidesRoute = Ember.Route.extend({
  model: function() {
    return getRidesData();
  },
  setupController: function (controller, model) {
    console.log('TEST559');
    console.log(model);
    controller.set('model', model);       
  }
});

App.RideController = Ember.ObjectController.extend({
  isEditing: false,

  actions: {

  }
});


App.ProfileRoute = Ember.Route.extend({
  // TODO: http://emberjs.com/guides/models/connecting-to-an-http-server/
  // return $.get("/api/profile", function(data) {
  //   alert(data);
  // }).fail(function() {
  //   alert('error!');
  // });
  
  model: function(params) {
     return ['test', 'test 2'];
    //return this.store.findall('profile');
  }
});

Ember.Handlebars.helper('format-date', function(date) {
  return moment(date).format("MMM Do YY");
});

var getRidesData = function()
{
  return $.get("/api/rides", function( data ) {
    //alert( "Load was performed." + JSON.stringify(data) );
  }).fail(function() {
    //alert( "error" );
  });
}