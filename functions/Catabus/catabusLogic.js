
const axios = require('axios');
const catabusRoutes = require('./busRoutes');


function getDistance(user_lat, user_lng, stop_lat, stop_lng) {
  return Math.sqrt(Math.pow(user_lat - stop_lat, 2) + Math.pow(user_lng - stop_lng, 2));
}


class cataAPIService {

    async getRouteDetails(route) {
        var busID;
        for(var i = 0; i < catabusRoutes.BUS_ROUTE_ID.buses.length; i++) {
          if(catabusRoutes.BUS_ROUTE_ID.buses[i].name === route) {
            busID = catabusRoutes.BUS_ROUTE_ID.buses[i].id;
            console.log("Got bus id: " + busID);
          }
        }
        return axios.get("www.https://realtime.catabus.com/InfoPoint/rest/RouteDetails/Get/" + busID)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.log("Error occurred: " + error);
            throw error;
        });
    }


    async getStopDetails(stopId) {
        return axios.get("https://realtime.catabus.com/InfoPoint/rest/StopDepartures/Get/" + stopId)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.log("Error occurred: " + error);
            throw error;
        });
    }

    findClosestStop(data, location) {
        var distance;
        var closest_stop;
        for(var i = 0; i < data.Stops.length; i++) {
          if(i == 0) {
            closest_stop = data.Stops[i];
            distance = getDistance(location.coordinates.latitude, location.coordinates.longitude, data.Stops[i].Latitude, data.Stops[i].Longitude);
          }
          else {
            if(getDistance(location.coordinates.latitude, location.coordinates.longitude, data.Stops[i].Latitude, data.Stops[i].Longitude) < distance) {
              closest_stop = data.Stops[i];
              distance = getDistance(location.coordinates.latitude, location.coordinates.longitude, data.Stops[i].Latitude, data.Stops[i].Longitude);
            }
          }
        }
        return closest_stop;
    }

    getStopDeparture(routeData, stopData) {
        var stop;
        for(var i = 0; i < stopData[0].RouteDirections.length; i++) {
          if(routeData.RouteId === stopData[0].RouteDirections[i].RouteId) {
            stop = stopData[0].RouteDirections[i];
          }
        }
        var estimatedDeparture = stop.Departures[0].EDTLocalTime;
        return estimatedDeparture;
    }
}

module.exports = new cataAPIService
