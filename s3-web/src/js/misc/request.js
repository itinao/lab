// @flow

const request = {
  fetchNews: (onSuccess, onFailure) => {
    fetch('https://3afp4sdaih.execute-api.ap-northeast-1.amazonaws.com/dev/rss?url=https://web.gekisaka.jp/feed', {
      mode: 'cors'
    }).then((response) => {
      return response.json();
    }).then((newsDatas) => {
      onSuccess(newsDatas);
    }).catch((error) => {
      console.log(error);
      onFailure();
    });
  },

  tokenRegister: (token, onSuccess, onFailure) => {
    fetch('https://3afp4sdaih.execute-api.ap-northeast-1.amazonaws.com/dev/topicregister?token=' + token, {
      mode: 'cors'
    }).then((response) => {
      onSuccess();
    }).catch((error) => {
      console.log(error);
      onFailure();
    });
  }
}

export default request;
