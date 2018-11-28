//Gets year Mappings in JSON
const = yearMappings = require("./year_mappings");

//Class containing functions for specific calender queries
class academicCalenderService{
	async getLateDropBegin(term, year){
		var date = new Date();
		console.log(month, year)

		if(term == null){
			month = date.getMonth()

			if(month >= 9 && month <=12){
				term = "fall"
				//console.log("fall")

			}
		  	else if (month >= 1 && month <= 5) {
		  		term = "spring"
		  		//console.log("spring")
			}
			else {
				term = "summer"
				//console.log("summer")
			}
		}

		if(year == null){
			yearDig = date.getFullYear()
			year = yearDig
			//console.log(year)
		}
		var strYear = year.toString()
		//console.log(term+strYear.substr(2))
		var semester = term+strYear.substr(2)
		//combine term adn year

		var responseList;
		var spawn = require('child_process').spawn,
		py = spawn('python',['Academic_Calendar_Table_Read.py', semester]), data, dataString ="";

		py.stdout.on('data',function(data){
			responseList = data;
		});

		var info;
		for(var i=0; i<respon.length; i++){
			if(responseList[i].Description === "2Late Drop Begins")
				info = responseList[i].Date
		}
		return "The beginning of the late drop deadline is "+info


		//call python script
    	// load here
		//hardcode latedrop "2Late Drop Begins"
		//returns something like string in final response
		//append term and year into string
		//pass to python script
		//get JSON back
		//parse JSON for answer
		//return answer
	}

	
}