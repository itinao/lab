// @flow

const request = {
  fetchNews: (category, onSuccess, onFailure) => {
    fetch('https://d1rvld1j103n12.cloudfront.net/assets/data/gekisaka-' + category + '.json', {
      mode: 'cors'
    }).then((response) => {
      return response.json();
    }).then((newsDatas) => {
      onSuccess(newsDatas.items);
    }).catch((error) => {
      console.log(error);
      onFailure();
    });
  },

  tokenRegister: (token, onSuccess, onFailure) => {
    fetch('https://3afp4sdaih.execute-api.ap-northeast-1.amazonaws.com/dev/topicregister?token=' + token, {
      mode: 'cors'
    }).then((_response) => {
      onSuccess();
    }).catch((error) => {
      console.log(error);
      onFailure();
    });
  }
}

export default request;
