
const axios = require('axios');
const catabusRoutes = require('./busRoutes');


function getDistance(user_lat, user_lng, stop_lat, stop_lng) {
  return Math.sqrt(Math.pow(user_lat - stop_lat, 2) + Math.pow(user_lng - stop_lng, 2));
}
//Temp comment
/*
catabusLogic = function (route, conv) {
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

*/


class cataAPIService {
    async getRouteDetails(route) {
        var busID;
        for(var i = 0; i < catabusRoutes.BUS_ROUTE_ID.buses.length; i++) {
          if(catabusRoutes.BUS_ROUTE_ID.buses[i].name === route) {
            busID = catabusRoutes.BUS_ROUTE_ID.buses[i].id;
            console.log("Got bus id: " + busID);
          }
        }
        var deferred  = Promise.defer();
        axios.get("https://realtime.catabus.com/InfoPoint/rest/RouteDetails/Get/" + route)
        .then((data) => {
            console.log(data);
            deferred.resolve(data)
        })
        return deferred.promise
    }


    async getStopDetails(stopId) {
        var deferred  = Promise.defer();

        axios.get("https://realtime.catabus.com/InfoPoint/rest/RouteDetails/Get/" + stopId)
        .then((data) => {
            deferred.resolve(data)
        })
        return deferred.promise
    }
}

module.exports = new cataAPIService
