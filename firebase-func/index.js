const functions = require('firebase-functions');
const url = require('url');
const request = require('request');

const headers = {
  'Content-Type':'application/xml'
};

const options = {
  method: 'GET',
  headers: headers,
};

exports.rss = functions.https.onRequest((req, res) => {
  const orgUrl = url.parse(req.originalUrl).query;

  if (req.method === "GET") {
    options["url"] = orgUrl;
    request(options, function (error, response, body) {
      res.status(200).send(body);
    })
  } else {
    res.status(404).end();
  }
});
