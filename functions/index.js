'use strict';
//Requiring files
var cataAPIService = require('./Catabus/catabusLogic');

//Objects used for dialogflow
const {
    dialogflow, Permission, Confirmation
} = require('actions-on-google');

//Enables firebase functionality
const functions = require('firebase-functions');
const app = dialogflow({
    debug: true
});



//Welcome intent, asks for permission for location data(To be changed)
app.intent("Default Welcome Intent", conv => {
    conv.ask(new Permission({
        context: 'Welcome to Happy Valley Helper ',
        permissions: 'DEVICE_PRECISE_LOCATION',
    }));
});


app.intent("late drop", conv => {
    conv.ask("The late drop period starts on Sunday, August 26th and the late drop deadline is currently scheduled for November 9th at 11:59 PM EST.");
});

app.intent("latedrop deadline", conv => {
    conv.ask("The late drop deadline is currently scheduled for November 9th at 11:59 PM EST.");
});

app.intent("latedrop start", conv => {
    conv.ask("The late drop period starts on Sunday, August 26th");
});

app.intent("class start", conv => {
    conv.ask("The first day of class for the fall semester is Monday, August 20th.");
});


app.intent("latedrop start", conv => {
    conv.ask("The late drop period starts on Sunday, August 26th");
});


app.intent("graduation intent", conv => {
    conv.ask("The activation period for intending to graduate is from Monday, August 13th to Tuesday, September 4th.");
});

app.intent("regular drop", conv => {
    conv.ask("The regular drop deadline is scheduled for Saturday August 25th at 11:59PM EST.");
});

app.intent("regular add", conv => {
    conv.ask("The regular add deadline is scheduled for Saturday August 26th at 11:59PM EST.");
});

app.intent("classes end", conv => {
    conv.ask("The final day of class for the fall semester is Friday, December 7th.");
});

app.intent("final exams", conv => {
    conv.ask("Final exams for the fall semester start on Monday, December 10th and end on Friday, December 14th.");
});

app.intent("thanksgiving break", conv => {
    conv.ask("There will be no classes from Sunday November 18th thru Saturday November 24th due to the Thanksgiving holiday.");
});


//Collects bus parameter for use in route definition
app.intent("wheres the catabus", (conv, {route}) => {
    var routeDetails;
    var closest_stop;
    return cataAPIService.getRouteDetails(route)
    .then((routeData) => {
        routeDetails = routeData;
        closest_stop = cataAPIService.findClosestStop(routeData, conv.device.location);
        return cataAPIService.getStopDetails(closest_stop.StopId)
    })
    .then((stopData) => {
        var departure = cataAPIService.getEstimatedStopDeparture(routeDetails, stopData);
        const final = departure.slice(departure.indexOf("t")+1, departure.length-1);
        //Add logic for when the loop is done running.
        /*
        if(done) {
            conv.ask("The closest stop to you is at " + closest_stop.Name + ". There are no buses running right now.")
        }
        else {
            conv.ask("The closest stop to you is at " + closest_stop.Name + ". The next departure is scheduled for " + final);
        }
        */
        conv.ask("The closest stop to you is at " + closest_stop.Name + ". The next departure is scheduled for " + final);
    })
    .catch((error) => {
        console.log(error);
        conv.ask("I can't get that information right now, please try again.");
    });
});

app.intent("how many catabus", (conv, {route}) => {
    var number_of_buses;
    return cataAPIService.getRouteDetails(route)
    .then((routeData) => {
        number_of_buses = cataAPIService.getNumberOfBuses(routeData);
        if(number_of_buses == 0) {
            conv.ask("There arent any buses running on that route right now.");
        }
        else if(number_of_buses == 1) {
            conv.ask("There is " + number_of_buses + " bus running on that route.");
        }
        else {
            conv.ask("There are " + number_of_buses + " buses running on that route.");
        }

    })
    .catch((error) => {
        console.log(error);
        conv.ask("I can't get that information right now, please try again.");
    })
});

app.intent("is the catabus", (conv, {route}) => {
    return cataAPIService.getRouteDetails(route)
    .then((routeData) => {
        if(routeData.Vehicles.length == 0 ) {
            conv.ask("That route is not running right now.");
        }
        else {
            conv.ask("That route is running right now.");
        }
    })
    .catch((error) => {
        console.log(error);
        conv.ask("I can't get that information right now, please try again.");
    })
});

app.intent("closest bus stop catabus", conv => {
    return cataAPIService.getAllStops()
    .then((data) => {
        var closest_stop = cataAPIService.findClosestStopAllStops(data, conv.device.location);
        conv.ask("The closest bus stop to you is at " + closest_stop.Name);
    })
    .catch((error) => {
        console.log(error);
        conv.ask("I can't get that information right now, please try again.");
    })
});


app.intent("bus fare catabus", conv => {
  conv.ask("The bus fair for all buses is 2 dollars except for the campus loops which are free.");
});

//Needs testing
app.intent("bus passengers catabus", (conv, {route}) => {
    return cataAPIService.getRouteDetails(route)
    .then((routeData) => {
        var numberOfPassengers = cataAPIService.getBusPassengers(routeData);
        conv.ask("There are currently " + routeData.Vehicles.length + " busses running for that route, along with " + numberOfPassengers + " people on all buses.");
    })
    .catch((error) {
        console.log(error);
        conv.ask("I can't get that information right now, please try again.");
    })
});

//Needs testing
app.intent("closest bus catabus", route => {
    return cataAPIService.getRouteDetails(route)
    .then((routeData) => {
        var closestBus = cataAPIService.findClosestBus(routeData, conv.device.location);
        conv.ask("The closest bus to you just left " + closestBus.LastStop + " and is currently enroute to + " closestBus.Destination + ".");
    })
    .catch((error) => {
        console.log(error);
        conv.ask("I can't get that information right now, please try again.");
    })
});


//Needs testing
app.intent("how long until bus catabus", (conv, {route}) => {
    var routeId = cataAPIService.busIdMatch(route);
    var closestStop;
    var departure;
    var routeDetails;

    return cataAPIService.getRouteDetails(route)
    .then((routeData) => {
        routeDetails = routeData;
        closestStop = cataAPIService.findClosestStop(routeData, conv.device.location);
        return cataAPIService.getStopDetails(closestStop.StopId)
    })
    .then((stopData) => {
        arrival = cataAPIService.getEstimatedArrivalTime(routeDetails, stopData);
        conv.ask("The closest stop for that bus route is at " + closestStop.Name " and the next departure is expected at " + arrival);
    })
    .catch((error) => {
        console.log(error);
        conv.ask("I can't get that information right now, please try again.")
    })
});


//Needs testing and configuration
app.intent("how long until bus at stop catabus", (conv, {route, stop}) => {
    var stopId = cataAPIService.stopIdMatch(stop);
    var stopName;
    var routeId = cataAPIService.busIdMatch(route);
    var stopHasBus = false;
    var routeDetails;
    var arrival;

    if(stopId === 0 && routeId === 0) {
        conv.ask("I couldnt find that bus or stop, please try again.");
    }
    else if (stopId === 0) {
        conv.ask("I couldnt find that bus stop, please try again.");
    }
    else if (routeId === 0) {
        conv.ask("I couldnt find that bus route, please try again.");
    }
    else {
        return cataAPIService.getRouteDetails(route)
        .then((routeData) => {
            routeDetails = routeData;
            for(var i = 0; i < routeData.Stops.length; i++) {
                if(routeData.Stops[i].StopId === stopId) {
                    stopHasBus = true;
                    stopName = routeData.Stops[i].Name;
                }
            }
            if(stopHasBus) {
                return cataAPIService.getStopDetails(stopId)
                .then((stopData) => {
                    arrival = cataAPIService.getEstimatedArrivalTime(routeDetails, stopData);
                    conv.ask("The estiamted arrival time for that bus at " + stopName + " is at " + arrival + ".");
                })
            }
            else {
                conv.ask("That bus is not available at that stop, please try a different combination.");
            }
        })
        .catch((error) => {
            console.log(error);
            conv.ask("I can't get that information right now, please try again.");
        })
    }
});


//Needs testing and configuration
app.intent("when bus leaves this stop catabus", (conv, {route, stop}) => {
    var stopId = cataAPIService.stopIdMatch(stop);
    var stopName;
    var routeId = cataAPIService.busIdMatch(route);
    var stopHasBus = false;
    var routeDetails;
    var departure;

    if(stopId === 0 && routeId === 0) {
        conv.ask("I couldnt find that bus or stop, please try again.");
    }
    else if (stopId === 0) {
        conv.ask("I couldnt find that bus stop, please try again.");
    }
    else if (routeId === 0) {
        conv.ask("I couldnt find that bus route, please try again.");
    }
    else {
        return cataAPIService.getRouteDetails(route)
        .then((routeData) => {
            routeDetails = routeData;
            for(var i = 0; i < routeData.Stops.length; i++) {
                if(routeData.Stops[i].StopId === stopId) {
                    stopHasBus = true;
                    stopName = routeData.Stops[i].Name;
                }
            }
            if(stopHasBus) {
                return cataAPIService.getStopDetails(stopId)
                .then((stopData) => {
                    departure = cataAPIService.getEstimatedStopDeparture(routeDetails, stopData);
                    conv.ask("The estiamted arrival time for that bus at " + stopName + " is at " + departure + ".");
                })
            }
            else {
                conv.ask("That bus is not available at that stop, please try a different combination.");
            }
        })
        .catch((error) => {
            console.log(error);
            conv.ask("I can't get that information right now, please try again.");
        })
    }
});

//Needs testing and configuration
app.intent("bus departures from stop catabus", (conve, {route, stop}) => {
    var stopId = cataAPIService.stopIdMatch(stop);
    var stopName;
    var routeId = cataAPIService.busIdMatch(route);
    var stopHasBus = false;
    var routeDetails;
    var departures = [];

    if(stopId === 0 && routeId === 0) {
        conv.ask("I couldnt find that bus or stop, please try again.");
    }
    else if (stopId === 0) {
        conv.ask("I couldnt find that bus stop, please try again.");
    }
    else if (routeId === 0) {
        conv.ask("I couldnt find that bus route, please try again.");
    }
    else {
        return cataAPIService.getRouteDetails(route)
        .then((routeData) => {
            routeDetails = routeData;
            for(var i = 0; i < routeData.Stops.length; i++) {
                if(routeData.Stops[i].StopId === stopId) {
                    stopHasBus = true;
                    stopName = routeData.Stops[i].Name;
                }
            }
            if(stopHasBus) {
                return cataAPIService.getStopDetails(stopId)
                .then((stopData) => {
                    departures = cataAPIService.getAllEstimatedStopDeparture(routeDetails, stopData);
                    conv.ask("There are currently " + departures[0] + " scheduled right now with the next one being at " + departures[1] + ".");
                })
            }
            else {
                conv.ask("That bus is not available at that stop, please try a different combination.");
            }
        })
        .catch((error) => {
            console.log(error);
            conv.ask("I can't get that information right now, please try again.");
        })
    }
});


//This intent fires when permission is asked for
app.intent('receive location', (conv, params, granted) => {
    const explicit = conv.arguments.get('PERMISSION');
    if (granted) {
        const location = {
            "lat": conv.device.location.coordinates.latitude,
            "lng": conv.device.location.coordinates.longitude
        };
        conv.ask("Thank you for your location, now how can I help you?")
    } else {
        conv.ask("I cant help you without your location, please try again!");
    }

});



exports.dialogflowFirebaseFulfillment = functions.https.onRequest(app);
