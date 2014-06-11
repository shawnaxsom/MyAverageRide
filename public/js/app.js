App = Ember.Application.create();

App.Router.map(function() {
  this.resource("rides", function() {
    this.resource("ride", { path: ":id" });
  });
  this.resource("auth");
  this.resource("index");
  this.resource("profile");
});

// App.ApplicationAdapter = DS.RESTAdapter.extend({
//   namespace: 'api'
// });

App.AuthRoute = Ember.Route.extend({
  // redirect: function() {
  //   window.location.replace("https://www.strava.com/oauth/authorize?client_id=1437&response_type=code&redirect_uri=http://localhost:3000/auth&scope=write&state=mystate&approval_prompt=force");
  // }
});

App.RidesRoute = Ember.Route.extend({
  model: function() {
    return getRidesData();
  }
});

App.RideRoute = Ember.Route.extend({
  model: function(params) {
    return getRidesData().then(function(data) { 
        return data.findBy('id', params.id) 
      });

    // return $.getJSON('')
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