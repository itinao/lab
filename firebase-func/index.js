const functions = require('firebase-functions');
const url = require('url');
const request = require('request');
const FeedParser = require('feedparser');

const feedparser = new FeedParser({});

exports.rss = functions.https.onRequest((req, res) => {
  const orgUrl = url.parse(req.originalUrl).query;
  const items = [];

  if (req.method === "GET") {
    const feedReq = request(orgUrl);
    feedReq.on('response', function (response) {
      this.pipe(feedparser)
        .on('error', function(error) {
          response.status(500).json({
            'message': 'HTTP failure while fetching feed'
          });
        })
        .on('meta', function(meta) {
        })
        .on('readable', function() {
          while(item = this.read()) {
            items.push({title: item.title, link: item.link});
          }
        })
        .on('end', function() {
          res.status(200).send(items);
        });
    });

  } else {
    res.status(404).end();
  }
});
