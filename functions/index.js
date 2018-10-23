'use strict';
var https = require('https');


const {dialogflow, Permission, Confirmation} = require('actions-on-google');
const functions = require('firebase-functions');
const app = dialogflow({debug: true});



//Bus routes with ID for API url. Missing downtown and south atherton football shuttles.
var busAssociation = {
  "buses": [
    {"name": "Blue loop", "id": 55},
    {"name": "White Loop", "id": 57},
    {"name": "Red link", "id": 51},
    {"name": "Green link", "id": 53},
    {"name": "A", "id": 1},
    {"name": "B", "id": 4},
    {"name": "C", "id": 7},
    {"name": "F", "id": 10},
    {"name": "G", "id": 11},
    {"name":" HC", "id": 61},
    {"name":" HM", "id": 60},
    {"name": "K", "id": 16},
    {"name": "N", "id": 22},
    {"name": "NE", "id": 21},
    {"name": "NV", "id": 25},
    {"name": "R", "id": 31},
    {"name": "RC", "id": 33},
    {"name": "RP", "id": 34},
    {"name": "S", "id": 37},
    {"name": "UT", "id": 40},
    {"name": "V", "id": 43},
    {"name": "VE", "id": 42},
    {"name": "VN", "id": 44},
    {"name": "W", "id": 46},
    {"name": "WE", "id": 45},
    {"name": "XB", "id": 49},
    {"name":" XG", "id": 50}
  ]
}





  let getLoop = function(route) {
    var busID = 55;
    for(var i = 0; i < busAssociation.buses.length; i++) {
      if(busAssociation.buses[i].name === route) {
        busID = busAssociation.buses[i].id;
      }
    }


    return new Promise(function(resolve, reject) {
      var optionsget = {
        host:"realtime.catabus.com",
        path:"/InfoPoint/rest/RouteDetails/Get/" + busID,
        method : 'GET'
      };
      var req = https.get(optionsget, function(res){
          var rawdata = '';
          res.on('data', function(chunk){
              rawdata += chunk;
          });
          res.on('end', function(){
              var busInfo = JSON.parse(rawdata);
              console.log("Got bus data for: " + route);
              resolve(busInfo);
          });
      }).on('error', function(e){
            console.log(e);
            reject(Error(e));
      });
      req.end();
    });
  }


  let getStopData = function(stopId) {
    return new Promise(function(resolve, reject) {
      var optionsget = {
        host:"realtime.catabus.com",
        path:"/InfoPoint/rest/StopDepartures/Get/" + stopId,
        method : 'GET'
      };
      var req = https.get(optionsget, function(res){
          var rawdata = '';
          res.on('data', function(chunk){
              rawdata += chunk;
          });
          res.on('end', function(){
              var stopInfo = JSON.parse(rawdata);
              console.log("Got closest stop data for: " + stopId);
              resolve(stopInfo);
          });
      }).on('error', function(e){
            console.log(e);
            reject(Error(e));
      });
      req.end();
    });
  }



app.intent("Default Welcome Intent", conv => {
  conv.ask(new Permission({
      context: 'Welcome to Happy Valley Helper! To better your experience',
      permissions: 'DEVICE_PRECISE_LOCATION',
    }));
});


app.intent("late drop", conv => {
  conv.close("The late drop period starts on Sunday, August 26th and the late drop deadline is currently scheduled for November 9th at 11:59 PM EST.");
});

app.intent("latedrop deadline", conv => {
  conv.close("The late drop deadline is currently scheduled for November 9th at 11:59 PM EST.");
});

app.intent("latedrop start", conv => {
  conv.close("The late drop period starts on Sunday, August 26th");
});

app.intent("class start", conv => {
  conv.close("The first day of class for the fall semester is Monday, August 20th.");
});


app.intent("random stuff", conv => {
  conv.close("");
});


function getDistance(user_lat, user_lng, stop_lat, stop_lng) {
  return Math.sqrt(Math.pow(user_lat - stop_lat, 2) + Math.pow(user_lng - stop_lng, 2));
}

//WIP catabus functionality
//Collects bus parameter for use in route definition
app.intent("catabus", (conv, {route}) => {
   return getLoop(route)
    .then(function(fromResolve){
        var distance;
        var closest_stop;
        for(var i = 0; i < fromResolve.Stops.length; i++) {
          if(i == 0) {
            closest_stop = fromResolve.Stops[i];
            distance = getDistance(conv.device.location.coordinates.latitude, conv.device.location.coordinates.longitude, fromResolve.Stops[i].Latitude, fromResolve.Stops[i].Longitude);
          }
          else {
            if(getDistance(conv.device.location.coordinates.latitude, conv.device.location.coordinates.longitude, fromResolve.Stops[i].Latitude, fromResolve.Stops[i].Longitude) < distance) {
              closest_stop = fromResolve.Stops[i];
              distance = getDistance(conv.device.location.coordinates.latitude, conv.device.location.coordinates.longitude, fromResolve.Stops[i].Latitude, fromResolve.Stops[i].Longitude);
            }
          }
        }
        return  getStopData(closest_stop.StopId)
         .then(function(resolveData){
           var stopData;
           for(var i = 0; i < resolveData[0].RouteDirections.length; i++) {
             if(fromResolve.RouteId === resolveData[0].RouteDirections[i].RouteId) {
               stopData = resolveData[0].RouteDirections[i];
             }
           }
           var estimatedDeparture = stopData.Departures[0].EDTLocalTime;
           //Javascript string functions not working?????
           var final = estimatedDeparture.substring(estimatedDeparture.indexOf("t")+1, estimatedDeparture.length-1);
           conv.close("The closest stop to you is at " + closest_stop.Name + ". The next departure is scheduled for " + final);
         })
         .catch(function(reject){
            conv.close("The closest stop to you is at " + closest_stop.Name + ". I could not get schedule information though.");
         });

    })
    .catch(function(fromReject){
      conv.close("There was an error in retrieving this information, please try again.");
    });
});



app.intent("graduation intent", conv => {
  conv.close("The activation period for intending to graduate is from Monday, August 13th to Tuesday, September 4th.");
});

app.intent("regular drop", conv => {
  conv.close("The regular drop deadline is scheduled for Saturday August 25th at 11:59PM EST.");
});

app.intent("regular add", conv => {
  conv.close("The regular add deadline is scheduled for Saturday August 26th at 11:59PM EST.");
});


app.intent("classes end", conv => {
  conv.close("The final day of class for the fall semester is Friday, December 7th.");
});

app.intent("final exams", conv => {
  conv.close("Final exams for the fall semester start on Monday, December 10th and end on Friday, December 14th.");
});

app.intent("thanksgiving break", conv => {
  conv.close("There will be no classes from Sunday November 18th thru Saturday November 24th due to the Thanksgiving holiday.");
});


app.intent('receive location', (conv, params, granted) => {
  const explicit = conv.arguments.get('PERMISSION');
  if(granted) {
    const location = {"lat": conv.device.location.coordinates.latitude, "lng": conv.device.location.coordinates.longitude};
    conv.ask("Thank you for your location, now how can I help you?")
  }
  else {
    conv.close("I cant help you without your location, please try again!");
  }

});


//Above are finished intents. Anything below needs to be added to web template. Needs training

exports.dialogflowFirebaseFulfillment = functions.https.onRequest(app);
