//Gets year Mappings in JSON
const = yearMappings = require("./year_mappings");

//Class containing functions for specific calender queries
class academicCalenderService{
	async getLateDrop(term, year){
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