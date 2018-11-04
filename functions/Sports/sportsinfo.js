let Parser = require('rss-parser');

let parser = new Parser({
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
    ],
  }
});
/*
    other variable information
    link
    content
    contentsnippet
    guid
*/
let fullList = [];


parser.parseURL('https://gopsusports.com/calendar.ashx/calendar.rss?sport_id=0', function(err, feed) {
  console.log(feed.title);
  feed.items.forEach(function(entry) {
    newItem = {
      event : {
        "title": entry.title,
        "location": entry.location,
        "startdate": entry.startdate,
        "enddate": entry.enddate,
        "opponent": entry.opponent
      }
    }
    fullList.push(newItem);

  })
})



exports.upcomingGame = function pyResult(sport){

let dataList = "The next " + sport + " game is: ";

data = fullList;

var spawn = require('child_process').spawn,
py    = spawn('python', ['upcomingGame.py', sport]),
data,
dataString = '';

/*Here we are saying that every time our node application receives data from the python process output stream(on 'data'), we want to convert that received data into a string and append it to the overall dataString.*/
py.stdout.on('data', function(data){
  dataList += data.toString();
});

/*Once the stream is done (on 'end') we want to simply log the received data to the console.*/
py.stdout.on('end', function(){
  console.log(dataList);
});

/*We have to stringify the data first otherwise our python process wont recognize it*/
py.stdin.write(JSON.stringify(fullList));

py.stdin.end();
}

exports.fullList = function pyList(){

let dataList = "";

data = fullList;

var spawn = require('child_process').spawn,
py    = spawn('python', ['fullList.py']),
data,
dataString = '';

/*Here we are saying that every time our node application receives data from the python process output stream(on 'data'), we want to convert that received data into a string and append it to the overall dataString.*/
py.stdout.on('data', function(data){
  dataList += data.toString();
});

/*Once the stream is done (on 'end') we want to simply log the received data to the console.*/
py.stdout.on('end', function(){
  console.log(dataList);
});

/*We have to stringify the data first otherwise our python process wont recognize it*/
py.stdin.write(JSON.stringify(fullList));

py.stdin.end();
}
