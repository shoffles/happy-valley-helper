let Parser = require('rss-parser');
let parser = new Parser();



(async () => {

  let feed = await parser.parseURL('https://gopsusports.com/calendar.ashx/calendar.rss?sport_id=0');
  console.log(feed.title);

  feed.items.forEach(item => {
    console.log(item)
  });

/*
  feed.items.forEach(item => {
    console.log("{" + item.title + "}")
  });
*/

})();
