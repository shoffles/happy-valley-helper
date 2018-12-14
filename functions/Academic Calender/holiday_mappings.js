exports.HOLIDAY_MAPPINGS = {
	"holidays" : [
		{"Labor Day Holiday" : "fall"},
		{"Thanksgiving" : "fall"},
		{"Martin Luther King Day" : "spring"},
		{"Spring Break" : "spring"}]
		/*
		Format:
		{holiday : semester}

		Implementation:
		The term associated with the queried holiday should be passed to "function getOptions(semester)", if appropriate.

		Notes:
		I'm not sure what "function getOptions(semester)" does, since each intent has its own call to the respective acedemic calendar.
		The mappings may only be needed in the functions calling for the certain holidays.
		It may be easier to create 2 more intents "getChristmasBreak(semester)" and "getWinterBreak(semester" and make them default
		to the respective semester using these mappings.

		Create mapping so if they say, "When is Christmas Break?" or "When is Winter Break?".
		These prompts should map to the fall semester end of finals.
		*/
}
