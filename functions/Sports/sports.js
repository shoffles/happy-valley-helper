const Parser = require('rss-parser');
const moment = require('moment-timezone');
const sports = require('./sportMappings.js');
const parser = new Parser({
  customFields: {
    item: [
      ['ev:location', 'location'],
      ['ev:startdate', 'startdate'],
      ['ev:enddate', 'enddate'],
      ['s:localstartdate', 'localstartdate'],
      ['s:localenddate', 'localenddate'],
      ['s:teamlogo', 'teamlogo'],
      ['s:opponentlogo', 'oponentlogo'],
      ['s:opponent', 'opponent'],
      ['s:gameid', 'gameid'],
      ['s:gamepromoname', 'gamepromoname'],
      ['s:links', 'links']
    ]
  }
});

function sportIdMatch(sport) {
    var sportId;
    for(var i = 0; i < sports.SPORT_ID.sports.length; i++) {
      if(sports.SPORT_ID.sports[i].sport === sport) {
        sportId = sports.SPORT_ID.sports[i].id;
        return sportId;
      }
    }
    //Edge case, cant find a match
    return 0;
}

//Gets RSS feed for sport
async function getSportList(sport) {
    let sportId = sportIdMatch(sport);
    //If sport wasnt found
    if(sportId === 0) {
        return 0;
    }
    else {
        let feed = await parser.parseURL('https://gopsusports.com/calendar.ashx/calendar.rss?sport_id=' + sportId);
        let fullList = feed.items.map(entry => {
          return {
            event: {
              'title': entry.title,
              'location': entry.location,
              'startdate': entry.startdate,
              'enddate': entry.enddate,
              'opponent': entry.opponent
            }
          };
        });
        return fullList;
    }
}

async function getResponse(sportDates, sport) {
  if (sportDates.event.title.includes('&')) {
    sportDates.event.title = sportDates.event.title.replace('&', 'and');
  }
  var response;
  if (sportDates) {
    let title = sportDates.event.title;
    let date = title.match(/^(((0)[0-9])|((1)[0-2])|[0-9])(\/)([0-2][0-9]|(3)[0-1]|[1-9])/);
    let answer;
    if (date !== null) {
      title = title.replace(date[0], '');
      answer = `${date[0]} ${title}`;
    } else {
      answer = title;
    }

    if (sportDates.event.title.includes('vs')) {
      response = `${answer} at ${sportDates.event.location}`;
    } else {
      response = answer;
    }
  } else {
    let adjustedSport = sport;
    if (sport.includes('&')) {
      adjustedSport = sport.replace('&', 'and');
    }
    response = `No events were found for ${adjustedSport} at this time`;
  }
  return response;
}

//Done
async function getRemainingAnswer(sportDates, sport) {
  let length = sportDates.length;
  let speechText;
  if (length > 0) {
    speechText = `There are ${length} scheduled ${sport} events left in ${moment().year()}.`;
  } else {
    speechText = `There are no scheduled ${sport} events left in ${moment().year()}.`;
  }
  return speechText;
}



//Done
async function getRemainingHomeAnswer(sportDates, sport) {
  let length = sportDates.length;
  let speechText;
  if (length > 0) {
    speechText = `There are ${length} scheduled home ${sport} events left in ${moment().year()}.`;
  } else {
    speechText = `There are no scheduled home ${sport} events left in ${moment().year()}.`;
  }
  return speechText;
}





class sportsRssFeed {


    //Done
    async getUpcomingSport(sport) {
      let fullList = await getSportList(sport);
      if(fullList === 0) {
          return ('I could not find that sport, please try again!');
      }
      else {
          let sportDates = fullList[0];
          return getResponse(sportDates, sport);
      }
    }




    //Done
    async getUpcomingHomeSport(sport) {
        let fullList = await getSportList(sport);
        if(fullList === 0) {
            return ('I could not find that sport, please try again!');
        }
        else {
            for(var i = 0; i < fullList.length; i++) {
                if(fullList[i].event.location.includes('University Park') || fullList[i].event.location.includes('Rec Hall')) {
                    let sportDates = fullList[i];
                    return getResponse(sportDates, sport);
                }
            }
        }
    }






    //Done
    async getRemainingSport(sport) {
      let fullList = await getSportList(sport);
      let sportDates = [];
      for(var i = 0; i < fullList.length; i++) {
          if(fullList[i].event.startdate > moment().format()
          && parseInt(fullList[i].event.startdate.substring(0, 4), 10) === moment().year()) {
            sportDates.push(fullList[i]);
        }
      }
      return getRemainingAnswer(sportDates, sport);
    }




    //Done
    async getRemainingHomeSport(sport) {
      let fullList = await getSportList(sport);
      let sportDates = [];
      for(var i = 0; i < fullList.length; i++) {
          if(fullList[i].event.startdate > moment().format()
          && parseInt(fullList[i].event.startdate.substring(0, 4), 10) === moment().year()
          && (fullList[i].event.location.includes('University Park') || fullList[i].event.location.includes('Rec Hall'))) {
            sportDates.push(fullList[i]);
        }
      }
      return getRemainingAnswer(sportDates, sport);
  }



}

module.exports = new sportsRssFeed
