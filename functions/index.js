'use strict';
var cataAPIService = require('./Catabus/catabusLogic');

const {
    dialogflow, Permission, Confirmation
} = require('actions-on-google');
const functions = require('firebase-functions');
const app = dialogflow({
    debug: true
});




app.intent("Default Welcome Intent", conv => {
    conv.ask(new Permission({
        context: 'Welcome to Happy Valley Helper',
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


app.intent("random stuff", conv => {
    conv.ask("");
});


//WIP catabus functionality
//Collects bus parameter for use in route definition
app.intent("catabus", (conv, {route}) => {
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


//Above are finished intents. Anything below needs to be added to web template. Needs training

exports.dialogflowFirebaseFulfillment = functions.https.onRequest(app);
