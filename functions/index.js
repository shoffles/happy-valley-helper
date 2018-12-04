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
            //console.log("fall")
        }
        else if (month >= 1 && month <= 5) {
            term = "spring";
            //console.log("spring")
        }
        else {
            term = "summer";
            //console.log("summer")
        }
    }
    if(year == ""){
        yearDig = date.getFullYear();
        year = yearDig;
        //console.log(year)
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
        conv.ask("The late drop period begins on " + map["2Late Drop Begins"] + " and ends on " + map["2Late Drop - Deadline"]);
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
            //console.log("fall")
        }
        else if (month >= 1 && month <= 5) {
            term = "spring";
            //console.log("spring")
        }
        else {
            term = "summer";
            //console.log("summer")
        }
    }
    if(year == ""){
        yearDig = date.getFullYear();
        year = yearDig;
        //console.log(year)
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
        conv.ask("The late drop period deadline is on " + map["2Late Drop - Deadline"]);
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
            //console.log("fall")
        }
        else if (month >= 1 && month <= 5) {
            term = "spring";
            //console.log("spring")
        }
        else {
            term = "summer";
            //console.log("summer")
        }
    }
    if(year == ""){
        yearDig = date.getFullYear();
        year = yearDig;
        //console.log(year)
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
        conv.ask("The late drop period begins on " + map["2Late Drop Begins"]);
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
            //console.log("fall")
        }
        else if (month >= 1 && month <= 5) {
            term = "spring";
            //console.log("spring")
        }
        else {
            term = "summer";
            //console.log("summer")
        }
    }
    if(year == ""){
        yearDig = date.getFullYear();
        year = yearDig;
        //console.log(year)
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
        conv.ask("Classes will begin on " + map["Classes Begin"]);
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
            //console.log("fall")
        }
        else if (month >= 1 && month <= 5) {
            term = "spring";
            //console.log("spring")
        }
        else {
            term = "summer";
            //console.log("summer")
        }
    }
    if(year == ""){
        yearDig = date.getFullYear();
        year = yearDig;
        //console.log(year)
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
        conv.ask("The intent to graduate activation period is from " + map["Intent to Graduate - Activation Period"]);
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
            //console.log("fall")
        }
        else if (month >= 1 && month <= 5) {
            term = "spring";
            //console.log("spring")
        }
        else {
            term = "summer";
            //console.log("summer")
        }
    }
    if(year == ""){
        yearDig = date.getFullYear();
        year = yearDig;
        //console.log(year)
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
        conv.ask("The reguar drop dealine is on " + map["2Regular Drop - Deadline"]);
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
            //console.log("fall")
        }
        else if (month >= 1 && month <= 5) {
            term = "spring";
            //console.log("spring")
        }
        else {
            term = "summer";
            //console.log("summer")
        }
    }
    if(year == ""){
        yearDig = date.getFullYear();
        year = yearDig;
        //console.log(year)
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
        conv.ask("The reguar add dealine is on " + map["2Regular Add - Deadline"]);
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
            //console.log("fall")
        }
        else if (month >= 1 && month <= 5) {
            term = "spring";
            //console.log("spring")
        }
        else {
            term = "summer";
            //console.log("summer")
        }
    }
    if(year == ""){
        yearDig = date.getFullYear();
        year = yearDig;
        //console.log(year)
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
        conv.ask("Classes end on " + map["Classes End"]);
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
            //console.log("fall")
        }
        else if (month >= 1 && month <= 5) {
            term = "spring";
            //console.log("spring")
        }
        else {
            term = "summer";
            //console.log("summer")
        }
    }
    if(year == ""){
        yearDig = date.getFullYear();
        year = yearDig;
        //console.log(year)
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
        conv.ask("Final Exams are from " + map["3Final Exams"] + ".");
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
    console.log(term);
    if(term == ""){
        month = date.getMonth();

        if(month >= 9 && month <=12){
            term = "fall";
            //console.log("fall")
        }
        else if (month >= 1 && month <= 5) {
            term = "spring";
            //console.log("spring")
        }
        else {
            term = "summer";
            //console.log("summer")
        }
    }
    if(year == ""){
        yearDig = date.getFullYear();
        year = yearDig;
        //console.log(year)
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
        date = map["Thanksgiving Holiday - No Classes"];
        conv.ask("The Thanksgiving Holiday is from " + map["Thanksgiving Holiday - No Classes"]);
    })
    .catch((error) => {
        console.log(error);
        conv.ask("An error occured, please try again.");
    })
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
            //console.log("fall")
        }
        else if (month >= 1 && month <= 5) {
            term = "spring";
            //console.log("spring")
        }
        else {
            term = "summer";
            //console.log("summer")
        }
    }
    if(year == ""){
        yearDig = date.getFullYear();
        year = yearDig;
        //console.log(year)
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
        conv.ask("The leave of absence deadline is on " + map["Leave of Absence - Deadline"]);
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
            //console.log("fall")
        }
        else if (month >= 1 && month <= 5) {
            term = "spring";
            //console.log("spring")
        }
        else {
            term = "summer";
            //console.log("summer")
        }
    }
    if(year == ""){
        yearDig = date.getFullYear();
        year = yearDig;
        //console.log(year)
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
        conv.ask("The arrival day for new students in on " + map["1 3Arrival Day - New Students"]);
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
            //console.log("fall")
        }
        else if (month >= 1 && month <= 5) {
            term = "spring";
            //console.log("spring")
        }
        else {
            term = "summer";
            //console.log("summer")
        }
    }
    if(year == ""){
        yearDig = date.getFullYear();
        year = yearDig;
        //console.log(year)
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
        date = map["1 3Arrival Day - Returning  Students"];
        conv.ask("The arrival day for returning students in on " + map["1 3Arrival Day - Returning  Students"]);
    })
    .catch((error) => {
        console.log(error);
        conv.ask("An error occured, please try again.");
    })
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
            //console.log("fall")
        }
        else if (month >= 1 && month <= 5) {
            term = "spring";
            //console.log("spring")
        }
        else {
            term = "summer";
            //console.log("summer")
        }
    }
    if(year == ""){
        yearDig = date.getFullYear();
        year = yearDig;
        //console.log(year)
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
        conv.ask("The student registration deadline is on " + map["Student Registration - Deadline"]);
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
            //console.log("fall")
        }
        else if (month >= 1 && month <= 5) {
            term = "spring";
            //console.log("spring")
        }
        else {
            term = "summer";
            //console.log("summer")
        }
    }
    if(year == ""){
        yearDig = date.getFullYear();
        year = yearDig;
        //console.log(year)
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
        conv.ask("Late registration begins on " + map["2Late Registration Begins"]);
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
            //console.log("fall")
        }
        else if (month >= 1 && month <= 5) {
            term = "spring";
            //console.log("spring")
        }
        else {
            term = "summer";
            //console.log("summer")
        }
    }
    if(year == ""){
        yearDig = date.getFullYear();
        year = yearDig;
        //console.log(year)
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
        date = map["Labor Day Holiday - No Classes"];
        conv.ask("There will be no classes on " + map["Labor Day Holiday - No Classes"] + " because of the labor day holiday.");
    })
    .catch((error) => {
        console.log(error);
        conv.ask("An error occured, please try again.");
    })
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
            //console.log("fall")
        }
        else if (month >= 1 && month <= 5) {
            term = "spring";
            //console.log("spring")
        }
        else {
            term = "summer";
            //console.log("summer")
        }
    }
    if(year == ""){
        yearDig = date.getFullYear();
        year = yearDig;
        //console.log(year)
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
        conv.ask("The final exam conflict filing period is from " + map["Final Exam Conflict - Filing Period"]);
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
            //console.log("fall")
        }
        else if (month >= 1 && month <= 5) {
            term = "spring";
            //console.log("spring")
        }
        else {
            term = "summer";
            //console.log("summer")
        }
    }
    if(year == ""){
        yearDig = date.getFullYear();
        year = yearDig;
        //console.log(year)
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
        date = map["Declare Minor - Deadline (Graduating Students"];
        conv.ask("The final day to declare a minor for graduating students is on " + map["Declare Minor - Deadline (Graduating Students"]);
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
            //console.log("fall")
        }
        else if (month >= 1 && month <= 5) {
            term = "spring";
            //console.log("spring")
        }
        else {
            term = "summer";
            //console.log("summer")
        }
    }
    if(year == ""){
        yearDig = date.getFullYear();
        year = yearDig;
        //console.log(year)
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
        conv.ask("The withdrawal deadline is on " + map["Withdrawal - Deadline"]);
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
            //console.log("fall")
        }
        else if (month >= 1 && month <= 5) {
            term = "spring";
            //console.log("spring")
        }
        else {
            term = "summer";
            //console.log("summer")
        }
    }
    if(year == ""){
        yearDig = date.getFullYear();
        year = yearDig;
        //console.log(year)
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
        conv.ask("The study days for this semester are from " + map["3Study Days"]);
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
            //console.log("fall")
        }
        else if (month >= 1 && month <= 5) {
            term = "spring";
            //console.log("spring")
        }
        else {
            term = "summer";
            //console.log("summer")
        }
    }
    if(year == ""){
        yearDig = date.getFullYear();
        year = yearDig;
        //console.log(year)
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
        conv.ask("Commencement for this smester is on " + map["3Commencement"]);
    })
    .catch((error) => {
        console.log(error);
        conv.ask("An error occured, please try again.");
    })
});





























//CATABUS SECTION
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

//Collects bus parameter for use in route definition
app.intent("wheres the catabus", (conv, {route}) => {
    var routeDetails;
    var closest_stop;
    var finalString;
    return cataAPIService.getRouteDetails(route)
    .then((routeData) => {
        routeDetails = routeData;
        closest_stop = cataAPIService.findClosestStop(routeData, conv.device.location);
        return cataAPIService.getStopDetails(closest_stop.StopId)
    })
    .then((stopData) => {
        var departure = cataAPIService.getEstimatedStopDeparture(routeDetails, stopData);
        console.log(typeof departure);
        console.log(departure);
        finalString = departure.slice(departure.indexOf('T')+1, departure.length - 3);
        //Add logic for when the loop is done running.
        /*
        if(done) {
            conv.ask("The closest stop to you is at " + closest_stop.Name + ". There are no buses running right now.")
        }
        else {
            conv.ask("The closest stop to you is at " + closest_stop.Name + ". The next departure is scheduled for " + final);
        }
        */
        conv.ask('The closest stop to you is at ' + closest_stop.Name + '. The next departure is scheduled for ' + finalString + ".");
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
  conv.ask("The bus fare for all buses is 2 dollars except for the campus loops which are free.");
});

//Needs testing
app.intent("bus passengers catabus", (conv, {route}) => {
    return cataAPIService.getRouteDetails(route)
    .then((routeData) => {
        var numberOfPassengers = cataAPIService.getAllBusPassengers(routeData);
        conv.ask("There are currently " + routeData.Vehicles.length + " busses running for that route, along with " + numberOfPassengers + " people on all buses.");
    })
    .catch((error) => {
        console.log(error);
        conv.ask("I can't get that information right now, please try again.");
    })
});

//Needs testing
app.intent("closest bus catabus", (conv, {route}) => {
    return cataAPIService.getRouteDetails(route)
    .then((routeData) => {
        var closestBus = cataAPIService.findClosestBus(routeData, conv.device.location);
        conv.ask("The closest bus to you just left " + closestBus.LastStop + " and is currently enroute " + closestBus.Destination + ".");
    })
    .catch((error) => {
        console.log(error);
        conv.ask("I can't get that information right now, please try again.");
    })
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
        routeDetails = routeData;
        closestStop = cataAPIService.findClosestStop(routeData, conv.device.location);
        return cataAPIService.getStopDetails(closestStop.StopId)
    })
    .then((stopData) => {
         arrival = cataAPIService.getEstimatedArrivalTime(routeDetails, stopData);
         finalString = arrival.slice(arrival.indexOf('T')+1, arrival.length - 3);
        conv.ask("The closest stop for that bus route is at " + closestStop.Name + " and the next departure is expected at " + finalString + ".");
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
                    finalString = arrival.slice(arrival.indexOf('T')+1, arrival.length - 3);
                    conv.ask("The estimated arrival time for that bus at " + stopName + " is at " + finalString + ".");
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


//Needs expansion of stops syn
app.intent("when bus leaves this stop catabus", (conv, {route, stop}) => {
    var stopId = cataAPIService.stopIdMatch(stop);
    var stopName;
    var routeId = cataAPIService.busIdMatch(route);
    var stopHasBus = false;
    var routeDetails;
    var departure;
    var finalString;

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
                    finalString = departure.slice(departure.indexOf('T')+1, departure.length - 3);
                    conv.ask("The estimated departure time for that bus at " + stopName + " is at " + finalString + ".");
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
                    departures = cataAPIService.getAllEstimatedStopDepartures(routeDetails, stopData);
                    finalString = departures[0].slice(departures[0].indexOf('T')+1, departures[0].length - 3);
                    conv.ask("There are currently " + departures.length + " scheduled right now with the next one being at " + finalString + ".");
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


app.intent('upcoming game', (conv, {sport}) => {
    var sports = sportsInfo.getCalenderEvents();
    var dialogue = sportsInfo.pyResult(sport);
    conv.ask(dialogue);
});

app.intent('game result', (conv, {sport, data}) => {
      var dialogue = sportsInfo.pyScore(sport, data);
      conv.ask(dialogue);
});

app.intent('left in season', (conv, {sport, year}) => {
      var dialogue = sportsInfo.pySeasonNum(sport, year);
      conv.ask(dialogue);
});

app.intent('upcoming home game', (conv, {sport, year}) => {
      var dialogue = sportsInfo.pyHome(sport);
      conv.ask(dialogue);
});

app.intent('home games left in season', (conv, {sport, year}) => {
      var dialogue = sportsInfo.pySeasonHomeNum(sport, year);
      conv.ask(dialogue);
});


exports.dialogflowFirebaseFulfillment = functions.https.onRequest(app);
