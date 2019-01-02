'use strict';
//Requiring files
var cataAPIService = require('./Catabus/catabusLogic');
var sportsInfo = require('./Sports/sportsinfo');
var academicCalender = require('./Academic Calender/academic_calender_logic');
const rp = require('request-promise');
const cheerio = require('cheerio');
const yearMappings = require("./Academic Calender/year_mappings");


//Objects used for dialogflow
const {
    dialogflow, Permission, Confirmation
} = require('actions-on-google');

//Enables firebase functionality
const functions = require('firebase-functions');
const app = dialogflow({
    debug: true
});

function getOptions(semester) {
    const options = {
        uri: `https://www.registrar.psu.edu/academic_calendar/${semester}.cfm`,
        transform: function (body) {
            return cheerio.load(body);
      }
    };
    return options;
}

//Welcome intent, asks for permission for location data(To be changed)
app.intent("Default Welcome Intent", conv => {
    conv.ask(new Permission({
        context: 'Welcome to Happy Valley Helper ',
        permissions: 'DEVICE_PRECISE_LOCATION',
    }));
});
































//ACADEMIC CALENDER SECTION
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
app.intent("late drop", (conv,{term,year}) => {
    var date = new Date();
    var month;
    var yearDig;
    console.log(term);
    if(term == ""){
        month = date.getMonth();

        if(month >= 9 && month <=12){
            term = "fall";

        }
        else if (month >= 1 && month <= 5) {
            term = "spring";

        }
        else {
            term = "summer";

        }
    }
    if(year == ""){
        yearDig = date.getFullYear();
        year = yearDig;

    }
    var strYear = year.toString();
    var semester = term+strYear.substr(2);
    const options = {
        uri: `https://www.registrar.psu.edu/academic_calendar/${semester}.cfm`,
        transform: function (body) {
            return cheerio.load(body);
      }
    };
    return rp(options)
    .then(($) => {
        let map = {};
        let columnOne = [];
        let columnThree = [];

        $('table').find('tr td:nth-child(1)').each(function (index, element) {
            columnOne.push($(element).text());
          });

        $('table').find('tr td:nth-child(3)').each(function (index, element) {
            columnThree.push($(element).text());
        });

        columnOne.forEach((item, i) => {
            map[item] = columnThree[i];
        });

        console.log(map);
        date = map["2Late Drop Begins"];
        conv.close("The late drop period begins on " + map["2Late Drop Begins"] + " and ends on " + map["2Late Drop - Deadline"] + " for " + term + " " + year +".");
    })
    .catch((error) => {
        console.log(error);
        conv.ask("An error occured, please try again.");
    })
});

app.intent("latedrop deadline", (conv, {term, year}) => {
    var date = new Date();
    var month;
    var yearDig;
    console.log(term);
    if(term == ""){
        month = date.getMonth();

        if(month >= 9 && month <=12){
            term = "fall";

        }
        else if (month >= 1 && month <= 5) {
            term = "spring";

        }
        else {
            term = "summer";

        }
    }
    if(year == ""){
        yearDig = date.getFullYear();
        year = yearDig;

    }
    var strYear = year.toString();
    var semester = term+strYear.substr(2);
    const options = {
        uri: `https://www.registrar.psu.edu/academic_calendar/${semester}.cfm`,
        transform: function (body) {
            return cheerio.load(body);
      }
    };
    return rp(options)
    .then(($) => {
        let map = {};
        let columnOne = [];
        let columnThree = [];

        $('table').find('tr td:nth-child(1)').each(function (index, element) {
            columnOne.push($(element).text());
          });

        $('table').find('tr td:nth-child(3)').each(function (index, element) {
            columnThree.push($(element).text());
        });

        columnOne.forEach((item, i) => {
            map[item] = columnThree[i];
        });

        console.log(map);
        date = map["2Late Drop - Deadline"];
        conv.close("The late drop period deadline is on " + map["2Late Drop - Deadline"] + " for " + term + " " + year +".");
    })
    .catch((error) => {
        console.log(error);
        conv.ask("An error occured, please try again.");
    })
});

app.intent("latedrop start", (conv, {term, year}) => {
    var date = new Date();
    var month;
    var yearDig;
    console.log(term);
    if(term == ""){
        month = date.getMonth();

        if(month >= 9 && month <=12){
            term = "fall";

        }
        else if (month >= 1 && month <= 5) {
            term = "spring";

        }
        else {
            term = "summer";

        }
    }
    if(year == ""){
        yearDig = date.getFullYear();
        year = yearDig;

    }
    var strYear = year.toString();
    var semester = term+strYear.substr(2);
    const options = {
        uri: `https://www.registrar.psu.edu/academic_calendar/${semester}.cfm`,
        transform: function (body) {
            return cheerio.load(body);
      }
    };
    return rp(options)
    .then(($) => {
        let map = {};
        let columnOne = [];
        let columnThree = [];

        $('table').find('tr td:nth-child(1)').each(function (index, element) {
            columnOne.push($(element).text());
          });

        $('table').find('tr td:nth-child(3)').each(function (index, element) {
            columnThree.push($(element).text());
        });

        columnOne.forEach((item, i) => {
            map[item] = columnThree[i];
        });

        console.log(map);
        date = map["2Late Drop Begins"];
        conv.close("The late drop period begins on " + map["2Late Drop Begins"] + " for " + term + " " + year +".");
    })
    .catch((error) => {
        console.log(error);
        conv.ask("An error occured, please try again.");
    })
});

app.intent("class start", (conv, {term, year}) => {
    var date = new Date();
    var month;
    var yearDig;
    console.log(term);
    if(term == ""){
        month = date.getMonth();

        if(month >= 9 && month <=12){
            term = "fall";

        }
        else if (month >= 1 && month <= 5) {
            term = "spring";

        }
        else {
            term = "summer";

        }
    }
    if(year == ""){
        yearDig = date.getFullYear();
        year = yearDig;

    }
    var strYear = year.toString();
    var semester = term+strYear.substr(2);
    const options = {
        uri: `https://www.registrar.psu.edu/academic_calendar/${semester}.cfm`,
        transform: function (body) {
            return cheerio.load(body);
      }
    };
    return rp(options)
    .then(($) => {
        let map = {};
        let columnOne = [];
        let columnThree = [];

        $('table').find('tr td:nth-child(1)').each(function (index, element) {
            columnOne.push($(element).text());
          });

        $('table').find('tr td:nth-child(3)').each(function (index, element) {
            columnThree.push($(element).text());
        });

        columnOne.forEach((item, i) => {
            map[item] = columnThree[i];
        });

        console.log(map);
        date = map["Classes Begin"];
        conv.close("Classes will begin on " + map["Classes Begin"] + " for " + term + " " + year +".");
    })
    .catch((error) => {
        console.log(error);
        conv.ask("An error occured, please try again.");
    })
});



app.intent("graduation intent", (conv, {term, year}) => {
    var date = new Date();
    var month;
    var yearDig;
    console.log(term);
    if(term == ""){
        month = date.getMonth();

        if(month >= 9 && month <=12){
            term = "fall";

        }
        else if (month >= 1 && month <= 5) {
            term = "spring";

        }
        else {
            term = "summer";

        }
    }
    if(year == ""){
        yearDig = date.getFullYear();
        year = yearDig;

    }
    var strYear = year.toString();
    var semester = term+strYear.substr(2);
    const options = {
        uri: `https://www.registrar.psu.edu/academic_calendar/${semester}.cfm`,
        transform: function (body) {
            return cheerio.load(body);
      }
    };
    return rp(options)
    .then(($) => {
        let map = {};
        let columnOne = [];
        let columnThree = [];

        $('table').find('tr td:nth-child(1)').each(function (index, element) {
            columnOne.push($(element).text());
          });

        $('table').find('tr td:nth-child(3)').each(function (index, element) {
            columnThree.push($(element).text());
        });

        columnOne.forEach((item, i) => {
            map[item] = columnThree[i];
        });

        console.log(map);
        date = map["Intent to Graduate - Activation Period"];
        conv.close("The intent to graduate activation period is from " + map["Intent to Graduate - Activation Period"] + " for " + term + " " + year +".");
    })
    .catch((error) => {
        console.log(error);
        conv.ask("An error occured, please try again.");
    })
});

app.intent("regular drop", (conv, {term, year}) => {
    var date = new Date();
    var month;
    var yearDig;
    console.log(term);
    if(term == ""){
        month = date.getMonth();

        if(month >= 9 && month <=12){
            term = "fall";

        }
        else if (month >= 1 && month <= 5) {
            term = "spring";

        }
        else {
            term = "summer";

        }
    }
    if(year == ""){
        yearDig = date.getFullYear();
        year = yearDig;

    }
    var strYear = year.toString();
    var semester = term+strYear.substr(2);
    const options = {
        uri: `https://www.registrar.psu.edu/academic_calendar/${semester}.cfm`,
        transform: function (body) {
            return cheerio.load(body);
      }
    };
    return rp(options)
    .then(($) => {
        let map = {};
        let columnOne = [];
        let columnThree = [];

        $('table').find('tr td:nth-child(1)').each(function (index, element) {
            columnOne.push($(element).text());
          });

        $('table').find('tr td:nth-child(3)').each(function (index, element) {
            columnThree.push($(element).text());
        });

        columnOne.forEach((item, i) => {
            map[item] = columnThree[i];
        });

        console.log(map);
        date = map["2Regular Drop - Deadline"];
        conv.close("The regular drop dealine is on " + map["2Regular Drop - Deadline"] + " for " + term + " " + year +".");
    })
    .catch((error) => {
        console.log(error);
        conv.ask("An error occured, please try again.");
    })
});

app.intent("regular add", (conv, {term, year}) => {
    var date = new Date();
    var month;
    var yearDig;
    console.log(term);
    if(term == ""){
        month = date.getMonth();

        if(month >= 9 && month <=12){
            term = "fall";

        }
        else if (month >= 1 && month <= 5) {
            term = "spring";

        }
        else {
            term = "summer";

        }
    }
    if(year == ""){
        yearDig = date.getFullYear();
        year = yearDig;

    }
    var strYear = year.toString();
    var semester = term+strYear.substr(2);
    const options = {
        uri: `https://www.registrar.psu.edu/academic_calendar/${semester}.cfm`,
        transform: function (body) {
            return cheerio.load(body);
      }
    };
    return rp(options)
    .then(($) => {
        let map = {};
        let columnOne = [];
        let columnThree = [];

        $('table').find('tr td:nth-child(1)').each(function (index, element) {
            columnOne.push($(element).text());
          });

        $('table').find('tr td:nth-child(3)').each(function (index, element) {
            columnThree.push($(element).text());
        });

        columnOne.forEach((item, i) => {
            map[item] = columnThree[i];
        });

        console.log(map);
        date = map["2Regular Add - Deadline"];
        conv.close("The regular add dealine is on " + map["2Regular Add - Deadline"] + " for " + term + " " + year +".");
    })
    .catch((error) => {
        console.log(error);
        conv.ask("An error occured, please try again.");
    })
});

app.intent("classes end", (conv, {term, year}) => {
    var date = new Date();
    var month;
    var yearDig;
    console.log(term);
    if(term == ""){
        month = date.getMonth();

        if(month >= 9 && month <=12){
            term = "fall";

        }
        else if (month >= 1 && month <= 5) {
            term = "spring";

        }
        else {
            term = "summer";

        }
    }
    if(year == ""){
        yearDig = date.getFullYear();
        year = yearDig;

    }
    var strYear = year.toString();
    var semester = term+strYear.substr(2);
    const options = {
        uri: `https://www.registrar.psu.edu/academic_calendar/${semester}.cfm`,
        transform: function (body) {
            return cheerio.load(body);
      }
    };
    return rp(options)
    .then(($) => {
        let map = {};
        let columnOne = [];
        let columnThree = [];

        $('table').find('tr td:nth-child(1)').each(function (index, element) {
            columnOne.push($(element).text());
          });

        $('table').find('tr td:nth-child(3)').each(function (index, element) {
            columnThree.push($(element).text());
        });

        columnOne.forEach((item, i) => {
            map[item] = columnThree[i];
        });

        console.log(map);
        date = map["Classes End"];
        conv.close("Classes end on " + map["Classes End"] + " for " + term + " " + year +".");
    })
    .catch((error) => {
        console.log(error);
        conv.ask("An error occured, please try again.");
    })
});

app.intent("final exams", (conv, {term, year}) => {
    var date = new Date();
    var month;
    var yearDig;
    console.log(term);
    if(term == ""){
        month = date.getMonth();

        if(month >= 9 && month <=12){
            term = "fall";

        }
        else if (month >= 1 && month <= 5) {
            term = "spring";

        }
        else {
            term = "summer";

        }
    }
    if(year == ""){
        yearDig = date.getFullYear();
        year = yearDig;

    }
    var strYear = year.toString();
    var semester = term+strYear.substr(2);
    const options = {
        uri: `https://www.registrar.psu.edu/academic_calendar/${semester}.cfm`,
        transform: function (body) {
            return cheerio.load(body);
      }
    };
    return rp(options)
    .then(($) => {
        let map = {};
        let columnOne = [];
        let columnThree = [];

        $('table').find('tr td:nth-child(1)').each(function (index, element) {
            columnOne.push($(element).text());
          });

        $('table').find('tr td:nth-child(3)').each(function (index, element) {
            columnThree.push($(element).text());
        });

        columnOne.forEach((item, i) => {
            map[item] = columnThree[i];
        });

        console.log(map);
        date = map["3Final Exams"];
        conv.close("Final Exams are from " + map["3Final Exams"] + " for " + term + " " + year +".");
    })
    .catch((error) => {
        console.log(error);
        conv.ask("An error occured, please try again.");
    })
});

app.intent("thanksgiving break", (conv, {term, year}) => {
    var date = new Date();
    var month;
    var yearDig;
    if(term == ""){
        month = date.getMonth();

        if(month >= 9 && month <=12){
            term = "fall";

        }
        else if (month >= 1 && month <= 5) {
            term = "spring";

        }
        else {
            term = "summer";

        }
    }
    if(year == ""){
        yearDig = date.getFullYear();
        year = yearDig;

    }
    if(term != "fall") {
        conv.close("The thanksgiving holiday is only in the fall semester!");
    }
    else {
        var strYear = year.toString();
        var semester = term+strYear.substr(2);
        const options = {
            uri: `https://www.registrar.psu.edu/academic_calendar/${semester}.cfm`,
            transform: function (body) {
                return cheerio.load(body);
          }
        };
        return rp(options)
        .then(($) => {
            let map = {};
            let columnOne = [];
            let columnThree = [];

            $('table').find('tr td:nth-child(1)').each(function (index, element) {
                columnOne.push($(element).text());
              });

            $('table').find('tr td:nth-child(3)').each(function (index, element) {
                columnThree.push($(element).text());
            });

            columnOne.forEach((item, i) => {
                map[item] = columnThree[i];
            });

            console.log(map);
            date = map["Thanksgiving Holiday - No Classes"];
            conv.close("The Thanksgiving Holiday is from " + map["Thanksgiving Holiday - No Classes"] + " for " + term + " " + year +".");
        })
        .catch((error) => {
            console.log(error);
            conv.ask("An error occured, please try again.");
        })
    }
});


app.intent("leave of absence deadline", (conv, {term, year}) => {
    var date = new Date();
    var month;
    var yearDig;
    console.log(term);
    if(term == ""){
        month = date.getMonth();

        if(month >= 9 && month <=12){
            term = "fall";

        }
        else if (month >= 1 && month <= 5) {
            term = "spring";

        }
        else {
            term = "summer";

        }
    }
    if(year == ""){
        yearDig = date.getFullYear();
        year = yearDig;

    }
    var strYear = year.toString();
    var semester = term+strYear.substr(2);
    const options = {
        uri: `https://www.registrar.psu.edu/academic_calendar/${semester}.cfm`,
        transform: function (body) {
            return cheerio.load(body);
      }
    };
    return rp(options)
    .then(($) => {
        let map = {};
        let columnOne = [];
        let columnThree = [];

        $('table').find('tr td:nth-child(1)').each(function (index, element) {
            columnOne.push($(element).text());
          });

        $('table').find('tr td:nth-child(3)').each(function (index, element) {
            columnThree.push($(element).text());
        });

        columnOne.forEach((item, i) => {
            map[item] = columnThree[i];
        });

        console.log(map);
        date = map["Leave of Absence - Deadline"];
        conv.close("The leave of absence deadline is on " + map["Leave of Absence - Deadline"] + " for " + term + " " + year +".");
    })
    .catch((error) => {
        console.log(error);
        conv.ask("An error occured, please try again.");
    })
});



app.intent("arrival day new students", (conv, {term, year}) => {
    var date = new Date();
    var month;
    var yearDig;
    console.log(term);
    if(term == ""){
        month = date.getMonth();

        if(month >= 9 && month <=12){
            term = "fall";

        }
        else if (month >= 1 && month <= 5) {
            term = "spring";

        }
        else {
            term = "summer";

        }
    }
    if(year == ""){
        yearDig = date.getFullYear();
        year = yearDig;

    }
    var strYear = year.toString();
    var semester = term+strYear.substr(2);
    const options = {
        uri: `https://www.registrar.psu.edu/academic_calendar/${semester}.cfm`,
        transform: function (body) {
            return cheerio.load(body);
      }
    };
    return rp(options)
    .then(($) => {
        let map = {};
        let columnOne = [];
        let columnThree = [];

        $('table').find('tr td:nth-child(1)').each(function (index, element) {
            columnOne.push($(element).text());
          });

        $('table').find('tr td:nth-child(3)').each(function (index, element) {
            columnThree.push($(element).text());
        });

        columnOne.forEach((item, i) => {
            map[item] = columnThree[i];
        });

        console.log(map);
        date = map["1 3Arrival Day - New Students"];
        conv.close("The arrival day for new students is on " + map["1 3Arrival Day - New Students"] + " for " + term + " " + year +".");
    })
    .catch((error) => {
        console.log(error);
        conv.ask("An error occured, please try again.");
    })
});


app.intent("arrival day returning students", (conv, {term, year}) => {
    var date = new Date();
    var month;
    var yearDig;
    console.log(term);
    if(term == ""){
        month = date.getMonth();

        if(month >= 9 && month <=12){
            term = "fall";

        }
        else if (month >= 1 && month <= 5) {
            term = "spring";

        }
        else {
            term = "summer";

        }
    }
    if(year == ""){
        yearDig = date.getFullYear();
        year = yearDig;

    }
    if(term != "fall") {
        conv.close("Returning students do not have a scheduled day for the spring semester!");
    }
    else {
        var strYear = year.toString();
        var semester = term+strYear.substr(2);
        const options = {
            uri: `https://www.registrar.psu.edu/academic_calendar/${semester}.cfm`,
            transform: function (body) {
                return cheerio.load(body);
          }
        };
        return rp(options)
        .then(($) => {
            let map = {};
            let columnOne = [];
            let columnThree = [];

            $('table').find('tr td:nth-child(1)').each(function (index, element) {
                columnOne.push($(element).text());
              });

            $('table').find('tr td:nth-child(3)').each(function (index, element) {
                columnThree.push($(element).text());
            });

            columnOne.forEach((item, i) => {
                map[item] = columnThree[i];
            });

            console.log(map);
            date = map["1 3Arrival Day - Returning  Students"];
            conv.close("The arrival day for returning students is on " + map["1 3Arrival Day - Returning  Students"] + " for " + term + " " + year +".");
        })
        .catch((error) => {
            console.log(error);
            conv.ask("An error occured, please try again.");
        })
    }
});







app.intent("student registration deadline", (conv, {term, year}) => {
    var date = new Date();
    var month;
    var yearDig;
    console.log(term);
    if(term == ""){
        month = date.getMonth();

        if(month >= 9 && month <=12){
            term = "fall";

        }
        else if (month >= 1 && month <= 5) {
            term = "spring";

        }
        else {
            term = "summer";

        }
    }
    if(year == ""){
        yearDig = date.getFullYear();
        year = yearDig;

    }
    var strYear = year.toString();
    var semester = term+strYear.substr(2);
    const options = {
        uri: `https://www.registrar.psu.edu/academic_calendar/${semester}.cfm`,
        transform: function (body) {
            return cheerio.load(body);
      }
    };
    return rp(options)
    .then(($) => {
        let map = {};
        let columnOne = [];
        let columnThree = [];

        $('table').find('tr td:nth-child(1)').each(function (index, element) {
            columnOne.push($(element).text());
          });

        $('table').find('tr td:nth-child(3)').each(function (index, element) {
            columnThree.push($(element).text());
        });

        columnOne.forEach((item, i) => {
            map[item] = columnThree[i];
        });

        console.log(map);
        date = map["Student Registration - Deadline"];
        conv.close("The student registration deadline is on " + map["Student Registration - Deadline"] + " for " + term + " " + year +".");
    })
    .catch((error) => {
        console.log(error);
        conv.ask("An error occured, please try again.");
    })
});



app.intent("late registration begin", (conv, {term, year}) => {
    var date = new Date();
    var month;
    var yearDig;
    console.log(term);
    if(term == ""){
        month = date.getMonth();

        if(month >= 9 && month <=12){
            term = "fall";

        }
        else if (month >= 1 && month <= 5) {
            term = "spring";

        }
        else {
            term = "summer";

        }
    }
    if(year == ""){
        yearDig = date.getFullYear();
        year = yearDig;

    }
    var strYear = year.toString();
    var semester = term+strYear.substr(2);
    const options = {
        uri: `https://www.registrar.psu.edu/academic_calendar/${semester}.cfm`,
        transform: function (body) {
            return cheerio.load(body);
      }
    };
    return rp(options)
    .then(($) => {
        let map = {};
        let columnOne = [];
        let columnThree = [];

        $('table').find('tr td:nth-child(1)').each(function (index, element) {
            columnOne.push($(element).text());
          });

        $('table').find('tr td:nth-child(3)').each(function (index, element) {
            columnThree.push($(element).text());
        });

        columnOne.forEach((item, i) => {
            map[item] = columnThree[i];
        });

        console.log(map);
        date = map["2Late Registration Begins"];
        conv.close("Late registration begins on " + map["2Late Registration Begins"] + " for " + term + " " + year +".");
    })
    .catch((error) => {
        console.log(error);
        conv.ask("An error occured, please try again.");
    })
});


app.intent("labor day", (conv, {term, year}) => {
    var date = new Date();
    var month;
    var yearDig;
    console.log(term);
    if(term == ""){
        month = date.getMonth();

        if(month >= 9 && month <=12){
            term = "fall";

        }
        else if (month >= 1 && month <= 5) {
            term = "spring";

        }
        else {
            term = "summer";

        }
    }
    if(year == ""){
        yearDig = date.getFullYear();
        year = yearDig;

    }
    if(term != "fall") {
        conv.close("Labor Day is only during the fall semester!.");
    }
    else {
        var strYear = year.toString();
        var semester = term+strYear.substr(2);
        const options = {
            uri: `https://www.registrar.psu.edu/academic_calendar/${semester}.cfm`,
            transform: function (body) {
                return cheerio.load(body);
          }
        };
        return rp(options)
        .then(($) => {
            let map = {};
            let columnOne = [];
            let columnThree = [];

            $('table').find('tr td:nth-child(1)').each(function (index, element) {
                columnOne.push($(element).text());
              });

            $('table').find('tr td:nth-child(3)').each(function (index, element) {
                columnThree.push($(element).text());
            });

            columnOne.forEach((item, i) => {
                map[item] = columnThree[i];
            });

            console.log(map);
            date = map["Labor Day Holiday - No Classes"];
            conv.close("There will be no classes on " + map["Labor Day Holiday - No Classes"] + " because of the labor day holiday.");
        })
        .catch((error) => {
            console.log(error);
            conv.ask("An error occured, please try again.");
        })
    }
});

app.intent("final exam conflict period", (conv, {term, year}) => {
    var date = new Date();
    var month;
    var yearDig;
    console.log(term);
    if(term == ""){
        month = date.getMonth();

        if(month >= 9 && month <=12){
            term = "fall";

        }
        else if (month >= 1 && month <= 5) {
            term = "spring";

        }
        else {
            term = "summer";

        }
    }
    if(year == ""){
        yearDig = date.getFullYear();
        year = yearDig;

    }
    var strYear = year.toString();
    var semester = term+strYear.substr(2);
    const options = {
        uri: `https://www.registrar.psu.edu/academic_calendar/${semester}.cfm`,
        transform: function (body) {
            return cheerio.load(body);
      }
    };
    return rp(options)
    .then(($) => {
        let map = {};
        let columnOne = [];
        let columnThree = [];

        $('table').find('tr td:nth-child(1)').each(function (index, element) {
            columnOne.push($(element).text());
          });

        $('table').find('tr td:nth-child(3)').each(function (index, element) {
            columnThree.push($(element).text());
        });

        columnOne.forEach((item, i) => {
            map[item] = columnThree[i];
        });

        console.log(map);
        date = map["Final Exam Conflict - Filing Period"];
        conv.close("The final exam conflict filing period is from " + map["Final Exam Conflict - Filing Period"] + " for " + term + " " + year +".");
    })
    .catch((error) => {
        console.log(error);
        conv.ask("An error occured, please try again.");
    })
});


app.intent("declare minor deadline", (conv, {term, year}) => {
    var date = new Date();
    var month;
    var yearDig;
    console.log(term);
    if(term == ""){
        month = date.getMonth();

        if(month >= 9 && month <=12){
            term = "fall";

        }
        else if (month >= 1 && month <= 5) {
            term = "spring";

        }
        else {
            term = "summer";

        }
    }
    if(year == ""){
        yearDig = date.getFullYear();
        year = yearDig;

    }
    var strYear = year.toString();
    var semester = term+strYear.substr(2);
    const options = {
        uri: `https://www.registrar.psu.edu/academic_calendar/${semester}.cfm`,
        transform: function (body) {
            return cheerio.load(body);
      }
    };
    return rp(options)
    .then(($) => {
        let map = {};
        let columnOne = [];
        let columnThree = [];

        $('table').find('tr td:nth-child(1)').each(function (index, element) {
            columnOne.push($(element).text());
          });

        $('table').find('tr td:nth-child(3)').each(function (index, element) {
            columnThree.push($(element).text());
        });

        columnOne.forEach((item, i) => {
            map[item] = columnThree[i];
        });

        console.log(map);
        date = map["Declare Minor - Deadline (Graduating Students)"];
        conv.close("The final day to declare a minor for graduating students is on " + map["Declare Minor - Deadline (Graduating Students)"] + " for " + term + " " + year +".");
    })
    .catch((error) => {
        console.log(error);
        conv.ask("An error occured, please try again.");
    })
});

app.intent("withdrawal deadline", (conv, {term, year}) => {
    var date = new Date();
    var month;
    var yearDig;
    console.log(term);
    if(term == ""){
        month = date.getMonth();

        if(month >= 9 && month <=12){
            term = "fall";

        }
        else if (month >= 1 && month <= 5) {
            term = "spring";

        }
        else {
            term = "summer";

        }
    }
    if(year == ""){
        yearDig = date.getFullYear();
        year = yearDig;

    }
    var strYear = year.toString();
    var semester = term+strYear.substr(2);
    const options = {
        uri: `https://www.registrar.psu.edu/academic_calendar/${semester}.cfm`,
        transform: function (body) {
            return cheerio.load(body);
      }
    };
    return rp(options)
    .then(($) => {
        let map = {};
        let columnOne = [];
        let columnThree = [];

        $('table').find('tr td:nth-child(1)').each(function (index, element) {
            columnOne.push($(element).text());
          });

        $('table').find('tr td:nth-child(3)').each(function (index, element) {
            columnThree.push($(element).text());
        });

        columnOne.forEach((item, i) => {
            map[item] = columnThree[i];
        });

        console.log(map);
        date = map["Withdrawal - Deadline"];
        conv.close("The withdrawal deadline is on " + map["Withdrawal - Deadline"] + " for " + term + " " + year +".");
    })
    .catch((error) => {
        console.log(error);
        conv.ask("An error occured, please try again.");
    })
});


app.intent("study days", (conv, {term, year}) => {
    var date = new Date();
    var month;
    var yearDig;
    console.log(term);
    if(term == ""){
        month = date.getMonth();

        if(month >= 9 && month <=12){
            term = "fall";

        }
        else if (month >= 1 && month <= 5) {
            term = "spring";

        }
        else {
            term = "summer";

        }
    }
    if(year == ""){
        yearDig = date.getFullYear();
        year = yearDig;

    }
    var strYear = year.toString();
    var semester = term+strYear.substr(2);
    const options = {
        uri: `https://www.registrar.psu.edu/academic_calendar/${semester}.cfm`,
        transform: function (body) {
            return cheerio.load(body);
      }
    };
    return rp(options)
    .then(($) => {
        let map = {};
        let columnOne = [];
        let columnThree = [];

        $('table').find('tr td:nth-child(1)').each(function (index, element) {
            columnOne.push($(element).text());
          });

        $('table').find('tr td:nth-child(3)').each(function (index, element) {
            columnThree.push($(element).text());
        });

        columnOne.forEach((item, i) => {
            map[item] = columnThree[i];
        });

        console.log(map);
        date = map["3Study Days"];
        conv.close("The study days for " + term + " " + year +  " are " + map["3Study Days"] + ".");
    })
    .catch((error) => {
        console.log(error);
        conv.ask("An error occured, please try again.");
    })
});

app.intent("commencement", (conv, {term, year}) => {
    var date = new Date();
    var month;
    var yearDig;
    console.log(term);
    if(term == ""){
        month = date.getMonth();

        if(month >= 9 && month <=12){
            term = "fall";

        }
        else if (month >= 1 && month <= 5) {
            term = "spring";

        }
        else {
            term = "summer";

        }
    }
    if(year == ""){
        yearDig = date.getFullYear();
        year = yearDig;

    }
    var strYear = year.toString();
    var semester = term+strYear.substr(2);
    const options = {
        uri: `https://www.registrar.psu.edu/academic_calendar/${semester}.cfm`,
        transform: function (body) {
            return cheerio.load(body);
      }
    };
    return rp(options)
    .then(($) => {
        let map = {};
        let columnOne = [];
        let columnThree = [];

        $('table').find('tr td:nth-child(1)').each(function (index, element) {
            columnOne.push($(element).text());
          });

        $('table').find('tr td:nth-child(3)').each(function (index, element) {
            columnThree.push($(element).text());
        });

        columnOne.forEach((item, i) => {
            map[item] = columnThree[i];
        });

        console.log(map);
        date = map["3Commencement"];
        conv.close("Commencement for " + term + " " + year +" is on " + map["3Commencement"] + ".");
    })
    .catch((error) => {
        console.log(error);
        conv.ask("An error occured, please try again.");
    })
});


app.intent("martin luther king", (conv, {term, year}) => {
    var date = new Date();
    var month;
    var yearDig;
    console.log(term);
    if(term == ""){
        month = date.getMonth();

        if(month >= 9 && month <=12){
            term = "fall";

        }
        else if (month >= 1 && month <= 5) {
            term = "spring";

        }
        else {
            term = "summer";

        }
    }
    if(year == ""){
        yearDig = date.getFullYear();
        year = yearDig;

    }
    if(term != "spring") {
        conv.close("The Martin Luther King holiday is only in the spring semester!");
    }
    else {
        var strYear = year.toString();
        var semester = term+strYear.substr(2);
        const options = {
            uri: `https://www.registrar.psu.edu/academic_calendar/${semester}.cfm`,
            transform: function (body) {
                return cheerio.load(body);
          }
        };
        return rp(options)
        .then(($) => {
            let map = {};
            let columnOne = [];
            let columnThree = [];

            $('table').find('tr td:nth-child(1)').each(function (index, element) {
                columnOne.push($(element).text());
              });

            $('table').find('tr td:nth-child(3)').each(function (index, element) {
                columnThree.push($(element).text());
            });

            columnOne.forEach((item, i) => {
                map[item] = columnThree[i];
            });

            console.log(map);
            date = map["Martin Luther King Day - No Classes"];
            conv.close("There will be no classes on " + map["Martin Luther King Day - No Classes"] + " for the Martin Luther King holiday.");
        })
        .catch((error) => {
            console.log(error);
            conv.ask("An error occured, please try again.");
        })
    }
});



app.intent("spring break", (conv, {term, year}) => {
    var date = new Date();
    var month;
    var yearDig;
    console.log(term);
    if(term == ""){
        month = date.getMonth();

        if(month >= 9 && month <=12){
            term = "fall";

        }
        else if (month >= 1 && month <= 5) {
            term = "spring";

        }
        else {
            term = "summer";

        }
    }
    if(year == ""){
        yearDig = date.getFullYear();
        year = yearDig;

    }
    if(term != "spring") {
        conv.close("Spring Break is only in the spring semester!");
    }
    else {
        var strYear = year.toString();
        var semester = term+strYear.substr(2);
        const options = {
            uri: `https://www.registrar.psu.edu/academic_calendar/${semester}.cfm`,
            transform: function (body) {
                return cheerio.load(body);
          }
        };
        return rp(options)
        .then(($) => {
            let map = {};
            let columnOne = [];
            let columnThree = [];

            $('table').find('tr td:nth-child(1)').each(function (index, element) {
                columnOne.push($(element).text());
              });

            $('table').find('tr td:nth-child(3)').each(function (index, element) {
                columnThree.push($(element).text());
            });

            columnOne.forEach((item, i) => {
                map[item] = columnThree[i];
            });

            console.log(map);
            date = map["Spring Break - No Classes"];
            conv.close("There will be no classes on " + map["Spring Break - No Classes"] + " for spring break.");
        })
        .catch((error) => {
            console.log(error);
            conv.ask("An error occured, please try again.");
        })
    }
});






















//CATABUS SECTION
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

//Collects bus parameter for use in route definition
app.intent("wheres the catabus", (conv, {route}) => {
    var routeDetails;
    var closest_stop;
    var finalString;
    var routeId = cataAPIService.busIdMatch(route);
    if(routeId === 0) {
        conv.ask("I couldnt find that bus, please try again.");
    }
    else {
        return cataAPIService.getRouteDetails(route)
        .then((routeData) => {
            routeDetails = routeData;
            if(routeData.Vehicles.length === 0) {
                conv.close("That route is not running right now.");
            }
            else {
                closest_stop = cataAPIService.findClosestStop(routeData, conv.device.location);
                return cataAPIService.getStopDetails(closest_stop.StopId)
                .then((stopData) => {
                    var departure = cataAPIService.getEstimatedStopDeparture(routeDetails, stopData);
                    finalString = departure.slice(departure.indexOf('T')+1, departure.length - 3);
                    conv.close('The closest stop to you is at ' + closest_stop.Name + '. The next departure is scheduled for ' + finalString + ".");
                })
            }
        })
        .catch((error) => {
            console.log(error);
            conv.ask("I can't get that information right now, please try again.");
        });
    }
});

app.intent("how many catabus", (conv, {route}) => {
    var number_of_buses;
    var routeId = cataAPIService.busIdMatch(route);
    if(routeId === 0) {
        conv.close("I couldnt find that bus, please try again.");
    }
    else {
        return cataAPIService.getRouteDetails(route)
        .then((routeData) => {
            number_of_buses = cataAPIService.getNumberOfBuses(routeData);
            if(number_of_buses == 0) {
                conv.close("There arent any buses running on that route right now.");
            }
            else if(number_of_buses == 1) {
                conv.close("There is " + number_of_buses + " bus running on that route.");
            }
            else {
                conv.close("There are " + number_of_buses + " buses running on that route.");
            }

        })
        .catch((error) => {
            console.log(error);
            conv.ask("I can't get that information right now, please try again.");
        })
    }
});

app.intent("is the catabus", (conv, {route}) => {
    var routeId = cataAPIService.busIdMatch(route);
    if(routeId === 0) {
        conv.close("I couldnt find that bus, please try again.");
    }
    else {
        return cataAPIService.getRouteDetails(route)
        .then((routeData) => {
            if(routeData.Vehicles.length == 0 ) {
                conv.close("That route is not running right now.");
            }
            else {
                conv.close("That route is running right now.");
            }
        })
        .catch((error) => {
            console.log(error);
            conv.ask("I can't get that information right now, please try again.");
        })
    }
});

app.intent("closest bus stop catabus", conv => {
    return cataAPIService.getAllStops()
    .then((data) => {
        var closest_stop = cataAPIService.findClosestStopAllStops(data, conv.device.location);
        conv.close("The closest bus stop to you is at " + closest_stop.Name + ".");
    })
    .catch((error) => {
        console.log(error);
        conv.ask("I can't get that information right now, please try again.");
    })
});


app.intent("bus fare catabus", conv => {
  conv.close("The bus fare for all buses is 2 dollars except for the campus loops which are free.");
});

//Needs testing
app.intent("bus passengers catabus", (conv, {route}) => {
    var routeId = cataAPIService.busIdMatch(route);
    if(routeId === 0) {
        conv.close("I couldnt find that bus, please try again.");
    }
    else {
        return cataAPIService.getRouteDetails(route)
        .then((routeData) => {
            if(routeData.Vehicles.length === 0) {
                conv.close("That route is not running right now.");
            }
            else {
                var numberOfPassengers = cataAPIService.getAllBusPassengers(routeData);
                conv.close("There are currently " + routeData.Vehicles.length + " busses running for that route, along with " + numberOfPassengers + " people on all buses.");
            }
        })
        .catch((error) => {
            console.log(error);
            conv.ask("I can't get that information right now, please try again.");
        })
    }
});

//Needs testing
app.intent("closest bus catabus", (conv, {route}) => {
    var routeId = cataAPIService.busIdMatch(route);
    if(routeId === 0) {
        conv.close("I couldnt find that bus, please try again.");
    }
    else {
        return cataAPIService.getRouteDetails(route)
        .then((routeData) => {
            if(routeData.Vehicles.length === 0) {
                conv.close("That route is not running right now.");
            }
            else {
                var closestBus = cataAPIService.findClosestBus(routeData, conv.device.location);
                conv.close("The closest bus to you just left " + closestBus.LastStop + " and is currently enroute " + closestBus.Destination + ".");
            }
        })
        .catch((error) => {
            console.log(error);
            conv.ask("I can't get that information right now, please try again.");
        })
    }
});


//Add fix for when routes are done running
app.intent("how long until bus catabus", (conv, {route}) => {
    var routeId = cataAPIService.busIdMatch(route);
    var closestStop;
    var departure;
    var routeDetails;
    var arrival;
    var finalString;

    return cataAPIService.getRouteDetails(route)
    .then((routeData) => {
        if(routeData.Vehicles.length === 0) {
            conv.close("That route is not running right now.");
        }
        else {
            if(routeId === 55 || routeId === 57) {
                conv.close("I cannot get stop departures for the Blue or White loops, but they can be expected about every 5 to 10 minutes at any campus stop.");
            }
            else {
                routeDetails = routeData;
                closestStop = cataAPIService.findClosestStop(routeData, conv.device.location);
                return cataAPIService.getStopDetails(closestStop.StopId)
                .then((stopData) => {
                     arrival = cataAPIService.getEstimatedArrivalTime(routeDetails, stopData);
                     finalString = arrival.slice(arrival.indexOf('T')+1, arrival.length - 3);
                     conv.close("The closest stop for that bus route is at " + closestStop.Name + " and the next departure is expected at " + finalString + ".");
                })
            }
        }

    })
    .catch((error) => {
        console.log(error);
        conv.ask("I can't get that information right now, please try again.")
    })
});


//Needs testing and configuration
app.intent("how long until bus at stop catabus", (conv, {route, stop}) => {
    console.log(stop);
    var stopId = cataAPIService.stopIdMatch(stop);
    console.log(stopId);
    var stopName;
    var routeId = cataAPIService.busIdMatch(route);
    var stopHasBus = false;
    var routeDetails;
    var arrival;
    var finalString;

    if(stopId === 0 && routeId === 0) {
        conv.close("I couldnt find that bus or stop, please try again.");
    }
    else if (stopId === 0) {
        conv.close("I couldnt find that bus stop, please try again.");
    }
    else if (routeId === 0) {
        conv.close("I couldnt find that bus route, please try again.");
    }
    else {
        return cataAPIService.getRouteDetails(route)
        .then((routeData) => {
            if(routeData.Vehicles.length === 0) {
                conv.close("That route is not running right now.");
            }
            else {
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
                        finalString = arrival.slice(arrival.indexOf('T')+1, arrival.length - 3);
                        conv.close("The estimated arrival time for that bus at " + stopName + " is at " + finalString + ".");
                    })
                }
                else {
                    conv.close("That bus is not available at that stop, please try a different combination.");
                }
            }
        })
        .catch((error) => {
            console.log(error);
            conv.ask("I can't get that information right now, please try again.");
        })
    }
});


//Needs expansion of stops syn
app.intent("when bus leaves this stop catabus", (conv, {route, stop}) => {
    var stopName;
    var stopHasBus = false;
    var routeDetails;
    var departure;
    var finalString;
    var stopId = cataAPIService.stopIdMatch(stop);
    var routeId = cataAPIService.busIdMatch(route);

    if(stopId === 0 && routeId === 0) {
        conv.close("I couldnt find that bus or stop, please try again.");
    }
    else if (stopId === 0) {
        conv.close("I couldnt find that bus stop, please try again.");
    }
    else if (routeId === 0) {
        conv.close("I couldnt find that bus route, please try again.");
    }
    else {
        return cataAPIService.getRouteDetails(route)
        .then((routeData) => {
            if(routeData.Vehicles.length === 0) {
                conv.close("That route is not running right now.");
            }
            else {
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
                        finalString = departure.slice(departure.indexOf('T')+1, departure.length - 3);
                        conv.close("The estimated departure time for that bus at " + stopName + " is at " + finalString + ".");
                    })
                }
                else {
                    conv.close("That bus is not available at that stop, please try a different combination.");
                }
            }
        })
        .catch((error) => {
            console.log(error);
            conv.ask("I can't get that information right now, please try again.");
        })
    }
});

//LAST ONE TO FIGURE OUT
app.intent("bus departures from stop catabus", (conv, {route, stop}) => {
    var stopId = cataAPIService.stopIdMatch(stop);
    var stopName;
    var routeId = cataAPIService.busIdMatch(route);
    var stopHasBus = false;
    var routeDetails;
    var departures = [];
    var finalString;

    if(stopId === 0 && routeId === 0) {
        conv.close("I couldnt find that bus or stop, please try again.");
    }
    else if (stopId === 0) {
        conv.close("I couldnt find that bus stop, please try again.");
    }
    else if (routeId === 0) {
        conv.close("I couldnt find that bus route, please try again.");
    }
    else {
        return cataAPIService.getRouteDetails(route)
        .then((routeData) => {
            if(routeData.Vehicles.length === 0) {
                conv.close("That route is not running right now.");
            }
            else {
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
                        departures = cataAPIService.getAllEstimatedStopDepartures(routeDetails, stopData);
                        console.log(departures);
                        finalString = departures[0].slice(departures[0].indexOf('T')+1, departures[0].length - 3);
                        conv.close("There are currently " + departures[1] + " scheduled right now with the next one being at " + finalString + ".");
                    })
                }
                else {
                    conv.close("That bus is not available at that stop, please try a different combination.");
                }
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
        conv.ask("Without your location I have limited functionality! What can I help you with?");
    }

});




exports.dialogflowFirebaseFulfillment = functions.https.onRequest(app);
