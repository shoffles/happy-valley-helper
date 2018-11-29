//Gets year Mappings in JSON
const yearMappings = require("./year_mappings");

//Class containing functions for specific calender queries
class academicCalenderService{
	async getIntentToGraduate(term, year){
		var date = new Date();
		var month;
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
		for(var i=0; i<responseList.length; i++){
			if(responseList[i].Description === "Intent to Graduate - Activation Period")
				info = responseList[i].Date
		}
		return "The activation period for intent to graduate is"+info
	}

	async getLeaveOfAbsence(term, year){
		var date = new Date();
		var month;
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
		for(var i=0; i<responseList.length; i++){
			if(responseList[i].Description === "Leave of Absence - Deadline")
				info = responseList[i].Date
		}
		return "The deadline for leave of absence is"+info
	}

	async getNewStudentArrival(term, year){
		var date = new Date();
		var month;
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
		for(var i=0; i<responseList.length; i++){
			if(responseList[i].Description === "1 3Arrival Day - New Students")
				info = responseList[i].Date
		}
		return "New students can arrive on"+info
	}

	async getReturnStudentArrival(term, year){
		var date = new Date();
		var month;
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
		for(var i=0; i<responseList.length; i++){
			if(responseList[i].Description === "1 3Arrival Day - Returning  Students")
				info = responseList[i].Date
		}
		return "Returning students can arrive on"+info
	}

	async getStudentRegistration(term, year){
		var date = new Date();
		var month;
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
		for(var i=0; i<responseList.length; i++){
			if(responseList[i].Description === "Student Registration - Deadline")
				info = responseList[i].Date
		}
		return "The deadline for student registration is"+info
	}

	async getClassesBegin(term, year){
		var date = new Date();
		var month;
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
		for(var i=0; i<responseList.length; i++){
			if(responseList[i].Description === "Classes Begin")
				info = responseList[i].Date
		}
		return "Classes start on"+info
	}

	async getRegularDrop(term, year){
		var date = new Date();
		var month;
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
		for(var i=0; i<responseList.length; i++){
			if(responseList[i].Description === "2Regular Drop - Deadline")
				info = responseList[i].Date
		}
		return "The deadine for regular drop is"+info
	}

	async getRegularAdd(term, year){
		var date = new Date();
		var month;
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
		for(var i=0; i<responseList.length; i++){
			if(responseList[i].Description === "2Regular Add - Deadline")
				info = responseList[i].Date
		}
		return "The deadine for regular add is"+info
	}

	async getLateDropBegin(term, year){
		var date = new Date();
		var month;
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
		for(var i=0; i<responseList.length; i++){
			if(responseList[i].Description === "2Late Drop Begins")
				info = responseList[i].Date
		}
		return "Late drop begins on "+info


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
	
	async getLateRegistration(term, year){
		var date = new Date();
		var month;
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
		for(var i=0; i<responseList.length; i++){
			if(responseList[i].Description === "2Late Registration Begins")
				info = responseList[i].Date
		}
		return "Late registration begins on"+info
	}

	async getLaborDay(term, year){
		var date = new Date();
		var month;
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
		for(var i=0; i<responseList.length; i++){
			if(responseList[i].Description === "Labor Day Holiday - No Classes")
				info = responseList[i].Date
		}
		return "Labor day is "+info+", no classes will be held."
	}

	async getFinalConlictPeriod(term, year){
		var date = new Date();
		var month;
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
		for(var i=0; i<responseList.length; i++){
			if(responseList[i].Description === "Final Exam Conflict - Filing Period")
				info = responseList[i].Date
		}
		return "The filing period for a final exam conflict is"+info
	}

	async getLateDropDeadline(term, year){
		var date = new Date();
		var month;
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
		for(var i=0; i<responseList.length; i++){
			if(responseList[i].Description === "2Late Drop - Deadline")
				info = responseList[i].Date
		}
		return "Late drop ends on "+info


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

	async getDeclareMinor(term, year){
		var date = new Date();
		var month;
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
		for(var i=0; i<responseList.length; i++){
			if(responseList[i].Description === "Declare Minor - Deadline (Graduating Students)")
				info = responseList[i].Date
		}
		return "Graduating seniors must declare their minor by"+info
	}

	async getThanksgiving(term, year){
		var date = new Date();
		var month;
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
		for(var i=0; i<responseList.length; i++){
			if(responseList[i].Description === "Thanksgiving Holiday - No Classes")
				info = responseList[i].Date
		}
		return "The Thanksgiving holiday is"+info+"There will be no classes during this time."
	}

	async getWithdrawal(term, year){
		var date = new Date();
		var month;
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
		for(var i=0; i<responseList.length; i++){
			if(responseList[i].Description === "Withdrawal - Deadline")
				info = responseList[i].Date
		}
		return "The withdrawal deadline is"+info
	}

	async getClassesEnd(term, year){
		var date = new Date();
		var month;
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
		for(var i=0; i<responseList.length; i++){
			if(responseList[i].Description === "Classes End")
				info = responseList[i].Date
		}
		return "Classes end on"+info
	}

	async getStudyDays(term, year){
		var date = new Date();
		var month;
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
		for(var i=0; i<responseList.length; i++){
			if(responseList[i].Description === "3Study Days")
				info = responseList[i].Date
		}
		return "Study days are"+info
	}

	async getFinalExams(term, year){
		var date = new Date();
		var month;
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
		for(var i=0; i<responseList.length; i++){
			if(responseList[i].Description === "3Final Exams")
				info = responseList[i].Date
		}
		return "The week of finals is"+info
	}

	async getCommencement(term, year){
		var date = new Date();
		var month;
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
		for(var i=0; i<responseList.length; i++){
			if(responseList[i].Description === "3Commencement")
				info = responseList[i].Date
		}
		return "Commencement ceremonies will be held on"+info
	}

	async getMLKDay(term, year){
		var date = new Date();
		var month;
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
		for(var i=0; i<responseList.length; i++){
			if(responseList[i].Description === "Martin Luther King Day - No Classes")
				info = responseList[i].Date
		}
		return "Martin Luther King day is on"+info+", no classes will be held."
	}

	async getSpringBreak(term, year){
		var date = new Date();
		var month;
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
		for(var i=0; i<responseList.length; i++){
			if(responseList[i].Description === "Spring Break - No Classes")
				info = responseList[i].Date
		}
		return "Spring Break is"+info+"There will be no classes during this time."
	}

}

module.exports = new academicCalenderService