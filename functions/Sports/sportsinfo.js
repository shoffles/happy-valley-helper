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
class sportsInfo {

  start() {
    let fullList = [];


    parser.parseURL('https://gopsusports.com/calendar.ashx/calendar.rss?sport_id=0', function(err, feed) {
      console.log(feed.title);
      feed.items.forEach(function(entry) {
        newItem = {
          event: {
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
    return fullList;
  }


  pyScore(sport, date) {

    let dataList = "";

    fullList = start();

    var spawn = require('child_process').spawn,
      py = spawn('python', ['gameResult.py', sport, date]),
      data,
      dataString = '';

    /*Here we are saying that every time our node application receives data from the python process output stream(on 'data'), we want to convert that received data into a string and append it to the overall dataString.*/
    py.stdout.on('data', function(data) {
      dataList += data.toString();
    });

    /*Once the stream is done (on 'end') we want to simply log the received data to the console.*/
    py.stdout.on('end', function() {
      console.log(dataList);
    });

    /*We have to stringify the data first otherwise our python process wont recognize it*/
    py.stdin.write(JSON.stringify(fullList));

    py.stdin.end();

    return dataList;

  }

  pySeasonNum(sport, year) {

    let dataList = "";

    fullList = start();

    var spawn = require('child_process').spawn,
      py = spawn('python', ['seasonNumLeft.py', sport, year]),
      data,
      dataString = '';

    /*Here we are saying that every time our node application receives data from the python process output stream(on 'data'), we want to convert that received data into a string and append it to the overall dataString.*/
    py.stdout.on('data', function(data) {
      dataList += data.toString();
    });

    /*Once the stream is done (on 'end') we want to simply log the received data to the console.*/
    py.stdout.on('end', function() {
      console.log(dataList);
    });

    /*We have to stringify the data first otherwise our python process wont recognize it*/
    py.stdin.write(JSON.stringify(fullList));

    py.stdin.end();

    return dataList;
  }
  pySeasonHomeNum(sport, year) {

    let dataList = "";

    fullList = start();

    var spawn = require('child_process').spawn,
      py = spawn('python', ['seasonHomeLeft.py', sport, year]),
      data,
      dataString = '';

    /*Here we are saying that every time our node application receives data from the python process output stream(on 'data'), we want to convert that received data into a string and append it to the overall dataString.*/
    py.stdout.on('data', function(data) {
      dataList += data.toString();
    });

    /*Once the stream is done (on 'end') we want to simply log the received data to the console.*/
    py.stdout.on('end', function() {
      console.log(dataList);
    });

    /*We have to stringify the data first otherwise our python process wont recognize it*/
    py.stdin.write(JSON.stringify(fullList));

    py.stdin.end();

    return dataList;
  }

  pyHome(sport) {

    let dataList = "";

    fullList = start();

    var spawn = require('child_process').spawn,
      py = spawn('python', ['upcomingHomeGame.py', sport]),
      data,
      dataString = '';

    /*Here we are saying that every time our node application receives data from the python process output stream(on 'data'), we want to convert that received data into a string and append it to the overall dataString.*/
    py.stdout.on('data', function(data) {
      dataList += data.toString();
    });

    /*Once the stream is done (on 'end') we want to simply log the received data to the console.*/
    py.stdout.on('end', function() {
      console.log(dataList);
    });

    /*We have to stringify the data first otherwise our python process wont recognize it*/
    py.stdin.write(JSON.stringify(fullList));

    py.stdin.end();

    return dataList;
  }

  pySeason(sport, year) {

    let dataList = "";

    fullList = start();

    var spawn = require('child_process').spawn,
      py = spawn('python', ['seasonSchedule.py', sport, year]),
      data,
      dataString = '';

    /*Here we are saying that every time our node application receives data from the python process output stream(on 'data'), we want to convert that received data into a string and append it to the overall dataString.*/
    py.stdout.on('data', function(data) {
      dataList += data.toString();
    });

    /*Once the stream is done (on 'end') we want to simply log the received data to the console.*/
    py.stdout.on('end', function() {
      console.log(dataList);
    });

    /*We have to stringify the data first otherwise our python process wont recognize it*/
    py.stdin.write(JSON.stringify(fullList));

    py.stdin.end();

    return dataList;
  }

  pyResult(sport) {

    let dataList = "";

    fullList = start();

    var spawn = require('child_process').spawn,
      py = spawn('python', ['upcomingGame.py', sport]),
      data,
      dataString = '';

    /*Here we are saying that every time our node application receives data from the python process output stream(on 'data'), we want to convert that received data into a string and append it to the overall dataString.*/
    py.stdout.on('data', function(data) {
      dataList += data.toString();
    });

    /*Once the stream is done (on 'end') we want to simply log the received data to the console.*/
    py.stdout.on('end', function() {
      console.log(dataList);
    });

    /*We have to stringify the data first otherwise our python process wont recognize it*/
    py.stdin.write(JSON.stringify(fullList));

    py.stdin.end();

    return dataList;
  }

  pyList() {

    let dataList = "";

    fullList = start();

    var spawn = require('child_process').spawn,
      py = spawn('python', ['fullList.py']),
      data,
      dataString = '';

    /*Here we are saying that every time our node application receives data from the python process output stream(on 'data'), we want to convert that received data into a string and append it to the overall dataString.*/
    py.stdout.on('data', function(data) {
      dataList += data.toString();
    });

    /*Once the stream is done (on 'end') we want to simply log the received data to the console.*/
    py.stdout.on('end', function() {
      console.log(dataList);
    });

    /*We have to stringify the data first otherwise our python process wont recognize it*/
    py.stdin.write(JSON.stringify(fullList));

    py.stdin.end();

    return dataList;
  }
}

module.exports = new sportsInfo
