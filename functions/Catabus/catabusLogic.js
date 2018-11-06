

const axios = require('axios');
//Gets catabus JSON constant
const catabusRoutes = require('./busRoutes');

//Distance calculator for closest stop
function getDistance(user_lat, user_lng, stop_lat, stop_lng) {
  return Math.sqrt(Math.pow(user_lat - stop_lat, 2) + Math.pow(user_lng - stop_lng, 2));
}

//Class containing functions regarding catabus infomration and logic
class cataAPIService {

    //Gets all routes details for a specific bus: ex. Blue loop
    async getRouteDetails(route) {
        var busID;
        //Looks for a match in the bus constants from user specified bus
        for(var i = 0; i < catabusRoutes.BUS_ROUTE_ID.buses.length; i++) {
          if(catabusRoutes.BUS_ROUTE_ID.buses[i].name === route) {
            busID = catabusRoutes.BUS_ROUTE_ID.buses[i].id;
            console.log("Got bus id: " + busID);
          }
        }
        //Get request to cataAPI
        return axios.get("www.https://realtime.catabus.com/InfoPoint/rest/RouteDetails/Get/" + busID)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.log("Error occurred: " + error);
            throw error;
        });
    }

    //Gets all details for a particular stop including estimated and scheduled departure times, most used in getting the cloesest stop to the user
    async getStopDetails(stopId) {
        //Get request to cataAPI
        return axios.get("https://realtime.catabus.com/InfoPoint/rest/StopDepartures/Get/" + stopId)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.log("Error occurred: " + error);
            throw error;
        });
    }



    //Logic for finding cloesest stop to a users device. Needs further development
    findClosestStop(data, location) {
        var distance;
        var closest_stop;
        //Loops through the colletion of stops returned from the cataAPI, by default sets the first item to the cloesest
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

    //Gets the estimated stop departure for a particular stop. Needs both a stop ID and a route ID to get the correct infomration
    //(Multiple routes use the same stops)
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

    getNumberOfBuses(routeData) {
        var number_of_buses = routeData.Vehicles.length;
        return number_of_buses;
    }
}
//Exports cataAPIService class
module.exports = new cataAPIService
