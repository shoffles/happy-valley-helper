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

parser.parseURL('https://gopsusports.com/calendar.ashx/calendar.rss?sport_id=0', function(err, feed) {
  console.log(feed.title);

  feed.items.forEach(function(entry) {
    console.log("{" + entry.title + ", will be located at " + entry.location + ", will start on " + entry.startdate + ", will end on " + entry.enddate + ", the opponent will be " + entry.opponent + "}");
  })
})
