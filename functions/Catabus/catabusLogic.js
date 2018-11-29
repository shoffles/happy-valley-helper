

const axios = require('axios');
//Gets catabus JSON constant
const catabusRoutes = require('./busConstants');

//Distance calculator for closest stop
function getDistance(user_lat, user_lng, stop_lat, stop_lng) {
  return Math.sqrt(Math.pow(user_lat - stop_lat, 2) + Math.pow(user_lng - stop_lng, 2));
}

function busIdMatchGlobal(route) {
    var busID;
    for(var i = 0; i < catabusRoutes.BUS_ROUTE_ID.buses.length; i++) {
      if(catabusRoutes.BUS_ROUTE_ID.buses[i].name === route) {
        busID = catabusRoutes.BUS_ROUTE_ID.buses[i].id;
        return busID;
      }
    }
    return 0;
}

function stopIdMatchGlobal(userStop) {
    var stopId;
    for(var i = 0; i < catabusRoutes.STOP_ID_TO_NAME.stops.length; i++) {
      if(catabusRoutes.STOP_ID_TO_NAME.stops[i].Name === userStop) {
        stopId = catabusRoutes.STOP_ID_TO_NAME.stops[i].StopId;
        console.log(stopId);
        return stopId;
      }
    }
    return 0;
}

//Class containing functions regarding catabus infomration and logic
class cataAPIService {

    //Gets all routes details for a specific bus: ex. Blue loop
    async getRouteDetails(route) {
        var busID = busIdMatchGlobal(route);
        //Get request to cataAPI
        return axios.get("www.https://realtime.catabus.com/InfoPoint/rest/RouteDetails/Get/" + busID)
        .then(response => response.data)
        .catch(error => {
            console.log("Error occurred: " + error);
            throw error;
        });
    }

    //Gets all details for a particular stop including estimated and scheduled departure times, most used in getting the cloesest stop to the user
    async getStopDetails(stopId) {
        //Get request to cataAPI
        return axios.get("https://realtime.catabus.com/InfoPoint/rest/StopDepartures/Get/" + stopId)
        .then(response => response.data)
        .catch(error => {
            console.log("Error occurred: " + error);
            throw error;
        });
    }

    async getAllStops() {
        //Get request to cataAPI
        return axios.get("https://realtime.catabus.com/InfoPoint/rest/RouteDetails/GetAllRouteDetails")
        .then(response => response.data)
        .catch(error => {
            console.log("Error occurred: " + error);
            throw error;
        });
    }

    busIdMatch(route) {
        var busID;
        for(var i = 0; i < catabusRoutes.BUS_ROUTE_ID.buses.length; i++) {
          if(catabusRoutes.BUS_ROUTE_ID.buses[i].name === route) {
            busID = catabusRoutes.BUS_ROUTE_ID.buses[i].id;
            return busID;
          }
        }
        return 0;
    }

    stopIdMatch(userStop) {
        var stopId;
        for(var i = 0; i < catabusRoutes.STOP_ID_TO_NAME.stops.length; i++) {
          if(catabusRoutes.STOP_ID_TO_NAME.stops[i].Name === userStop) {
            stopId = catabusRoutes.STOP_ID_TO_NAME.stops[i].StopId;
            console.log(stopId);
            return stopId;
          }
        }
        return 0;
    }

    findClosestStopAllStops(data, location) {
        var distance;
        var closest_stop;
        for(var i = 0; i < data.length; i++) {
            for(var j = 0; j < data[i].Stops.length; j++) {
                if(i == 0 ) {
                    closest_stop = data[i].Stops[i];
                    distance = getDistance(location.coordinates.latitude, location.coordinates.longitude, data[i].Stops[i].Latitude, data[i].Stops[i].Longitude)
                }
                else {
                    if(getDistance(location.coordinates.latitude, location.coordinates.longitude, data[i].Stops[j].Latitude, data[i].Stops[j].Longitude) < distance) {
                        closest_stop = data[i].Stops[j];
                        distance = getDistance(location.coordinates.latitude, location.coordinates.longitude, data[i].Stops[j].Latitude, data[i].Stops[j].Longitude);
                    }

                }
            }
        }
        return closest_stop;
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

    //
    findClosestBus(routeData, location) {
        var closestBus;
        var closestDistance;
        for(var i = 0; i < routeData.Vehicles.length; i++) {
            if( i == 0) {
                closestBus = routeData.Vehicles[i];
                closestDistance = getDistance(location.coordiants.latitude, location.coordiants.longitude, routeData.Vehicles[i].Latitude, routeData.Vehicles[i].Longitude);
            }
            else {
                if(getDistance(location.coordiants.latitude, location.coordiants.longitude, routeData.Vehicles[i].Latitude, routeData.Vehicles[i].Longitude) < closestDistance) {
                    closestBus = routeData.Vehicles[i];
                    closestDistance = getDistance(location.coordiants.latitude, location.coordiants.longitude, routeData.Vehicles[i].Latitude, routeData.Vehicles[i].Longitude);
                }
            }
        }
        return closestBus;
    }

    //Gets the estimated stop departure for a particular stop. Needs both a stop ID and a route ID to get the correct information
    //(Multiple routes use the same stops)
    getEstimatedStopDeparture(routeData, stopData) {
        var stop;
        var estimatedDeparture;

        console.log("HERERERERERE");
        console.log(routeData);
        console.log(stopData);

        for(var i = 0; i < stopData[0].RouteDirections.length; i++) {
          if(routeData.RouteId === stopData[0].RouteDirections[i].RouteId) {
            stop = stopData[0].RouteDirections[i];
          }
        }
        estimatedDeparture = stop.Departures[0].EDTLocalTime;
        return estimatedDeparture;
    }

    getAllEstimatedStopDepartures(routeData, stopData) {
        var stop;
        var estimatedDeparture;
        var numberOfDepartures;
        var data = new Array();

        for(var i = 0; i < stopData[0].RouteDirections.length; i++) {
          if(routeData.RouteId === stopData[0].RouteDirections[i].RouteId) {
            stop = stopData[0].RouteDirections[i];
            numberOfDepartures = stopData[0].RouteDirections[i].Departures.length;
          }
        }
        data.push(estimatedDeparture);
        data.push(numberOfDepartures);
        return data;
    }

    getEstimatedArrivalTime(routeData, stopData) {
        var stop;
        var estimatedArrival;

        for(var i = 0; i < stopData[0].RouteDirections.length; i++) {
          if(routeData.RouteId === stopData[0].RouteDirections[i].RouteId) {
            stop = stopData[0].RouteDirections[i];
          }
        }
        estimatedArrival = stop.Departures[0].ETALocalTime;
        return estimatedArrival;
    }



    getNumberOfBuses(routeData) {
        var number_of_buses = routeData.Vehicles.length;
        return number_of_buses;
    }


    getAllBusPassengers(routeData) {
        var passengers;
        for(var i = 0; i < routeData.Vehicles.length; i++) {
            passengers += routeData.Vehicles[i].OnBoard;
        }
        return passengers;
    }
}
//Exports cataAPIService class
module.exports = new cataAPIService
