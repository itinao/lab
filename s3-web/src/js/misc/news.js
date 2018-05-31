// @flow

class News {
  constructor() {
    this.datas = [];
  }

  fetch(onSuccess, onFailure) {
    fetch('https://3afp4sdaih.execute-api.ap-northeast-1.amazonaws.com/dev/rss?url=https://web.gekisaka.jp/feed', {
      mode: 'cors'
    }).then((response) => {
      return response.json();
    }).then((newsDatas) => {
      this.datas = newsDatas;
      onSuccess();
    }).catch((error) => {
      console.log(error);
      onFailure();
    });
  }
}

export default News;
