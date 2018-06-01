const request = require('request');
const FeedParser = require('feedparser');

const AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB({
    region: 'ap-northeast-1'
});

exports.rss = (event, context) => {
  // TODO: Dynamo ってソートできない?
  dynamo.scan(
    {TableName: "rss"},
    (err, data) => {
      let content = [];
      if (data.Items.length != 0) {
        data.Items.sort((a, b) => {
          if (a.updated_date.S > b.updated_date.S) return -1;
          if (a.updated_date.S < b.updated_date.S) return 1;
          return 0;
        });
        content = data.Items[0].content.S;
        console.log("updated_date: " + data.Items[0].updated_date.S);
      }

      context.succeed(JSON.parse(content));
    });
}

exports.storeRss = (event, context) => {
  const getStoreData = (callback) => {
    dynamo.scan(
      {TableName: "rss"},
      (err, data) => {
        let updatedDate = "";
        if (data.Items.length != 0){
          updatedDate = data.Items[0].updated_date.S;
        }
        callback(updatedDate);
      });
  }

  const getRssData = (callback) => {
    let updatedDate = "";
    const items = [];
    const feedReq = request("https://web.gekisaka.jp/feed");

    feedReq.on('response', function (response) {
      this.pipe(new FeedParser({}))
        .on('meta', function(meta) {
          updatedDate = meta.date;
        })
        .on('readable', function() {
          while(item = this.read()) {
            items.push({title: item.title, link: item.link});
          }
        })
        .on('end', function() {
          callback(updatedDate.getTime().toString(), JSON.stringify(items));
        });
    });
  }

  const storeData = (updatedDate, data, callback) => {
    const params = {
      TableName: "rss",
      Item: {
        updated_date: {S: updatedDate},
        content: {S: data}
      }
    };

    dynamo.putItem(params, (err, data) => {
      if (err) {
        console.error("Error occured", err);
      }
      callback();
    });
  }

  console.log("storeRss");
  getStoreData((updatedDate) => {
    console.log("updated_date: " + updatedDate);
    getRssData((rssUpdatedDate, data) => {
      console.log("rss_updated_date: " + rssUpdatedDate);

      if (updatedDate != rssUpdatedDate) {
        console.log("update!");
        storeData(rssUpdatedDate, data, context.succeed.bind(this, null));

        // TODO: ここでPush通知

        return;
      }

      context.succeed(null);
    });
  });
}
