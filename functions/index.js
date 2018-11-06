'use strict';
<<<<<<< HEAD
var https = require('https');
var catabusRoutes = require('./Catabus/busRoutes');
=======
var cataAPIService = require('./Catabus/catabusLogic');
>>>>>>> catabusEXP

const {
    dialogflow, Permission, Confirmation
} = require('actions-on-google');
const functions = require('firebase-functions');
const app = dialogflow({
    debug: true
});
<<<<<<< HEAD
=======


>>>>>>> catabusEXP


//Function for getting distance between users device and closest stop
function getDistance(user_lat, user_lng, stop_lat, stop_lng) {
    return Math.sqrt(Math.pow(user_lat - stop_lat, 2) + Math.pow(user_lng - stop_lng, 2));
}

//Function for retreiving Bus Route details from catabus API
let getLoop = function(route) {
    var busID = 55;
    for (var i = 0; i < catabusRoutes.BUS_ROUTE_ID.buses.length; i++) {
        if (catabusRoutes.BUS_ROUTE_ID.buses[i].name === route) {
            busID = catabusRoutes.BUS_ROUTE_ID.buses[i].id;
        }
    }
    return new Promise(function(resolve, reject) {
        var optionsget = {
            host: "realtime.catabus.com",
            path: "/InfoPoint/rest/RouteDetails/Get/" + busID,
            method: 'GET'
        };
        var req = https.get(optionsget, function(res) {
            var rawdata = '';
            res.on('data', function(chunk) {
                rawdata += chunk;
            });
            res.on('end', function() {
                var busInfo = JSON.parse(rawdata);
                console.log("Got bus data for: " + route);
                resolve(busInfo);
            });
        }).on('error', function(e) {
            console.log(e);
            reject(Error(e));
        });
        req.end();
    });
}

//Function for retreiving Stop Details from catabus API
let getStopData = function(stopId) {
    return new Promise(function(resolve, reject) {
        var optionsget = {
            host: "realtime.catabus.com",
            path: "/InfoPoint/rest/StopDepartures/Get/" + stopId,
            method: 'GET'
        };
        var req = https.get(optionsget, function(res) {
            var rawdata = '';
            res.on('data', function(chunk) {
                rawdata += chunk;
            });
            res.on('end', function() {
                var stopInfo = JSON.parse(rawdata);
                console.log("Got closest stop data for: " + stopId);
                resolve(stopInfo);
            });
        }).on('error', function(e) {
            console.log(e);
            reject(Error(e));
        });
        req.end();
    });
}


//Intents start here//
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

//Welcome intent, asks for permission for location data(To be changed)
app.intent("Default Welcome Intent", conv => {
    conv.ask(new Permission({
<<<<<<< HEAD
        context: 'Welcome to Happy Valley Helper! ',
=======
        context: 'Welcome to Happy Valley Helper',
>>>>>>> catabusEXP
        permissions: 'DEVICE_PRECISE_LOCATION',
    }));
});


app.intent("late drop", conv => {
<<<<<<< HEAD
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
=======
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
>>>>>>> catabusEXP
});


app.intent("random stuff", conv => {
<<<<<<< HEAD
    conv.close("");
=======
    conv.ask("");
>>>>>>> catabusEXP
});


//WIP catabus functionality
//Collects bus parameter for use in route definition
app.intent("catabus", (conv, {route}) => {
<<<<<<< HEAD
    return getLoop(route)
        .then(function(fromResolve) {
            var distance;
            var closest_stop;
            //Loops through all stops, applying the getDistance function to find closest stop to user
            for (var i = 0; i < fromResolve.Stops.length; i++) {
                if (i == 0) {
                    closest_stop = fromResolve.Stops[i];
                    distance = getDistance(conv.device.location.coordinates.latitude, conv.device.location.coordinates.longitude, fromResolve.Stops[i].Latitude, fromResolve.Stops[i].Longitude);
                } else {
                    if (getDistance(conv.device.location.coordinates.latitude, conv.device.location.coordinates.longitude, fromResolve.Stops[i].Latitude, fromResolve.Stops[i].Longitude) < distance) {
                        closest_stop = fromResolve.Stops[i];
                        distance = getDistance(conv.device.location.coordinates.latitude, conv.device.location.coordinates.longitude, fromResolve.Stops[i].Latitude, fromResolve.Stops[i].Longitude);
                    }
                }
            }
            return getStopData(closest_stop.StopId)
                .then(function(resolveData) {
                    var stopData;
                    //Loops through data looking for correct stop
                    for (var i = 0; i < resolveData[0].RouteDirections.length; i++) {
                        if (fromResolve.RouteId === resolveData[0].RouteDirections[i].RouteId) {
                            stopData = resolveData[0].RouteDirections[i];
                        }
                    }
                    //Pulls the nearest estimated departure from correct stop data
                    var estimatedDeparture = stopData.Departures[0].EDTLocalTime;
                    //Javascript string functions not working?????
                    var final = estimatedDeparture.substring(estimatedDeparture.indexOf("t") + 1, estimatedDeparture.length - 1);
                    conv.ask("The closest stop to you is at " + closest_stop.Name + ". The next departure is scheduled for " + final);
                })
                .catch(function(reject) {
                    conv.ask("The closest stop to you is at " + closest_stop.Name + ". I could not get schedule information though.");
                });

        })
        .catch(function(fromReject) {
            conv.ask("There was an error in retrieving this information, please try again.");
        });
=======
    var routeDetails;
    var closest_stop;
    return cataAPIService.getRouteDetails(route)
    .then((routeData) => {
        routeDetails = routeData;
        closest_stop = cataAPIService.findClosestStop(routeData, conv.device.location);
        return cataAPIService.getStopDetails(closest_stop.StopId)
    })
    .then((stopData) => {
        var departure = cataAPIService.getStopDeparture(routeDetails, stopData);
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
        conv.close("I can't get that information right now, please try again.");
    });
>>>>>>> catabusEXP
});


app.intent("graduation intent", conv => {
<<<<<<< HEAD
    conv.close("The activation period for intending to graduate is from Monday, August 13th to Tuesday, September 4th.");
});

app.intent("regular drop", conv => {
    conv.close("The regular drop deadline is scheduled for Saturday August 25th at 11:59PM EST.");
});

app.intent("regular add", conv => {
    conv.close("The regular add deadline is scheduled for Saturday August 26th at 11:59PM EST.");
=======
    conv.ask("The activation period for intending to graduate is from Monday, August 13th to Tuesday, September 4th.");
});

app.intent("regular drop", conv => {
    conv.ask("The regular drop deadline is scheduled for Saturday August 25th at 11:59PM EST.");
});

app.intent("regular add", conv => {
    conv.ask("The regular add deadline is scheduled for Saturday August 26th at 11:59PM EST.");
>>>>>>> catabusEXP
});


app.intent("classes end", conv => {
<<<<<<< HEAD
    conv.close("The final day of class for the fall semester is Friday, December 7th.");
});

app.intent("final exams", conv => {
    conv.close("Final exams for the fall semester start on Monday, December 10th and end on Friday, December 14th.");
});

app.intent("thanksgiving break", conv => {
    conv.close("There will be no classes from Sunday November 18th thru Saturday November 24th due to the Thanksgiving holiday.");
=======
    conv.ask("The final day of class for the fall semester is Friday, December 7th.");
});

app.intent("final exams", conv => {
    conv.ask("Final exams for the fall semester start on Monday, December 10th and end on Friday, December 14th.");
});

app.intent("thanksgiving break", conv => {
    conv.ask("There will be no classes from Sunday November 18th thru Saturday November 24th due to the Thanksgiving holiday.");
>>>>>>> catabusEXP
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
        conv.close("I cant help you without your location, please try again!");
    }

});



exports.dialogflowFirebaseFulfillment = functions.https.onRequest(app);
