// @flow

import React from 'react';
import * as ReactRedux from 'react-redux';
import * as Redux from 'redux';

import * as TopActionCreators from '../../action-creators/top-action-creators';
import ClassName from '../../misc/class-name';

import AppBar from '../common/app-bar';
import * as Tab from '../common/tab-root';
import NewsPage from './news-page';
import PaymentPage from './payment-page';

import type {RootState} from '../../store/root';
import type {TopState} from '../../store/top';

type Props = {
  onTabItemClick: (itemId: string) => void,
  pageState: TopState,
};

const className = ClassName('top', 'page');

class TopPage extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const {pageState} = this.props;

    return (
      <div className={className()}>
        <div className={className('appBarLayout')}>
          <AppBar title="Lab PWA"/>
        </div>
        <div className={className('tabLayout')}>
          <Tab.Root
            activeItemId={pageState.tabId}
            items={[
              {id: 'news', title: '日本代表'},
              {id: 'news2', title: 'Jリーグ'},
              {id: 'news3', title: '海外'},
              {id: 'payment', title: 'Payment'},
            ]}
            onItemClick={this.props.onTabItemClick}
          >
            <NewsPage category="nationalteam" />
            <NewsPage category="domestic"/>
            <NewsPage category="foreign"/>
            <PaymentPage/>
          </Tab.Root>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state: RootState) {
  return {
    pageState: state.top,
  }
}

function mapDispatchToProps(dispatch: Redux.Dispatch<*>) {
  return {
    onTabItemClick(itemId: string) {
      dispatch(
        TopActionCreators.changeTab(itemId),
      );
    }
  }
}

export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(TopPage);
