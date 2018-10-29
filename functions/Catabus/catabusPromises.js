const https = require('https');
const catabus = require('./Catabus/busRoutes');


function getDistance(user_lat, user_lng, stop_lat, stop_lng) {
  return Math.sqrt(Math.pow(user_lat - stop_lat, 2) + Math.pow(user_lng - stop_lng, 2));
}


function catabusLogic(route) {
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
}


let getLoop = function(route) {
  var busID = 55;
  for(var i = 0; i < catabus.BUS_ROUTE_ID.buses.length; i++) {
    if(catabus.BUS_ROUTE_ID.buses[i].name === route) {
      busID = catabus.BUS_ROUTE_ID.buses[i].id;
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
