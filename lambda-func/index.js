const request = require('request');
const FeedParser = require('feedparser');

const AWS = require('aws-sdk');
const s3 = new AWS.S3();
const dynamo = new AWS.DynamoDB({
    region: 'ap-northeast-1'
});

const credentials = require('./credentials');
const bucket = 'itinao-test';

exports.storeRssToS3 = (event, context) => {
  const nationalTask = new Promise((resolve, reject) => {
    storeRssData(
      'https://web.gekisaka.jp/feed?category=nationalteam',
      'assets/data/gekisaka-nationalteam.json',
      resolve,
      reject);
  });

  const domesticTask = new Promise((resolve, reject) => {
    storeRssData(
      'https://web.gekisaka.jp/feed?category=domestic',
      'assets/data/gekisaka-domestic.json',
      resolve,
      reject);
  });

  const foreignTask = new Promise((resolve, reject) => {
    storeRssData(
      'https://web.gekisaka.jp/feed?category=foreign',
      'assets/data/gekisaka-foreign.json',
      resolve,
      reject);
  });

  Promise.all([nationalTask, domesticTask, foreignTask])
    .then((items) => {
      console.log("succes!");
      const topicItems = items.filter(v => v);

      if (topicItems.length == 0) {
        console.log("no notification");
        context.succeed(null);
        return;
      }

      console.log("send notification");
      sendTopic({
        title: 'ニュースが更新されました',
        body: topicItems[0].title,
        content_available: true
      }, context.succeed.bind(this, null));
    }).catch(() => {
      console.log('error');
      context.fail();
    });
};

exports.topicRegister = (event, context) => {
  const topic = '/topics/movies';
  const url = 'https://iid.googleapis.com/iid/v1/{#TOKEN#}/rel{#TOPIC#}';

  console.log(event.token);
  request.post({
    url: url.replace('{#TOKEN#}', event.token).replace('{#TOPIC#}', topic),
    headers: {
      "Authorization": 'key=' + credentials.serverKey,
      "content-type": "application/json"
    },
    body: JSON.stringify({})
  }, (error, response, body) => {
    console.log(body);
    context.succeed(null);
  });
};

exports.sendTopicTest = (event, context) => {
  sendTopic(event.data, (error, response, body) => {
    console.log(body);
    context.succeed(null);
  })
};

const sendTopic = (notificationData, callback) => {
  const url = 'https://fcm.googleapis.com/fcm/send';

  request.post({
    url: url,
    headers: {
      "Authorization": 'key=' + credentials.serverKey,
      "content-type": "application/json"
    },
    body: JSON.stringify({
      to: "/topics/movies",
      notification: notificationData,
      data: {
        action: []
      }
    })
  }, (error, response, body) => {
    callback(error, response, body);
  });
};

const getRssData = (rssUrl, callback) => {
  let updatedDate = "";
  const items = [];
  const feedReq = request(rssUrl);

  feedReq.on('response', function (response) {
    this.pipe(new FeedParser({}))
      .on('meta', function(meta) {
        updatedDate = meta.date;
      })
      .on('readable', function() {
        while(item = this.read()) {
          items.push({title: item.title, link: item.link, content: item.description});
        }
      })
      .on('end', function() {
        callback(updatedDate.getTime().toString(), items);
      });
  });
};

const storeRssData = (rssUrl, saveFile, successCallback, failureCallback) => {
  getRssData(rssUrl, (rssUpdatedDate, items) => {
    const getParams = {
      Bucket: bucket,
      Key: saveFile
    };

    s3.getObject(getParams, (getErr, getData) => {
      if (getErr && getErr.code != 'AccessDenied') {
        console.error(getErr.code);
        failureCallback();
        return;
      }

      if (!getErr) {
        const s3News = JSON.parse(getData.Body.toString());
        if (rssUpdatedDate == s3News.updated_date) {
          // 最新だから更新しないよ
          console.log("not update!");
          successCallback();
          return;
        }
      }

      const putData = {
        updated_date: rssUpdatedDate,
        items: items
      };

      const putParams = {
        Bucket: bucket,
        Key: saveFile,
        Body: JSON.stringify(putData),
        ContentType: 'application/json',
        ACL: 'public-read-write'
      };

      s3.putObject(putParams, (putErr, putData) => {
        if (putErr) {
          console.error(getErr.code);
          failureCallback();
          return;
        }

        console.log("updated!");
        successCallback(items[0]);
      });
    });
  });
};
