const request = require('request');
const FeedParser = require('feedparser');

exports.rss = (event, context) => {
  const items = [];
  const feedReq = request(event.url);

  feedReq.on('response', function (response) {
    this.pipe(new FeedParser({}))
      .on('meta', function(meta) {
      })
      .on('readable', function() {
        while(item = this.read()) {
          items.push({title: item.title, link: item.link});
        }
      })
      .on('end', function() {
        context.succeed(items);
      });
  });
}
