// @flow

import React from 'react';
import * as ReactRedux from 'react-redux';
import * as Redux from 'redux';

import * as TopActionCreators from '../../action-creators/top-action-creators';
import ClassName from '../../misc/class-name';
import News from '../../misc/news';

import type {RootState} from '../../store/root';

type Props = {
  isFetched: boolean,
};

const className = ClassName('top', 'newsPage');

class NewsPage extends React.Component<Props> {
  constructor(props: Props) {
    super(props);

    this.state = {
      isFetched: false,
    };

    this.news = new News();
    this.news.fetch(() => {
      this.setState({
        isFetched: true,
      });
    }, () => {
      this.setState({
        isFetched: false,
      });
    })
  }

  render() {
    let newsElem = null;
    if (this.state.isFetched) {
      newsElem = (
        <ul>
          {this.news.datas.map((data) => {
            return <li key={data.link}><a href={data.link}>{data.title}</a></li>;
          })}
        </ul>
      );
    } else {
      newsElem = (<div className="common-loading"></div>);
    }

    return (
      <div className={className()}>
        <div className={className('section')}>
          <h1 className={className('title')}>
            News
          </h1>
          <div className={className('detail')}>
            {newsElem}
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state: RootState) {
  return {
  };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<*>) {
  return {
  };
}

export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(NewsPage);
