'use strict';
var https = require('https');
var catabus = require('./Catabus/catabusPromises');

const {dialogflow, Permission, Confirmation} = require('actions-on-google');
const functions = require('firebase-functions');
const app = dialogflow({debug: true});






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


//WIP catabus functionality
//Collects bus parameter for use in route definition
app.intent("catabus", (conv, {route}) => {
   catabusLogic(route);
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
