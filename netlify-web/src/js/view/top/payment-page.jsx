// @flow

import React from 'react';
import * as ReactRedux from 'react-redux';
import * as Redux from 'redux';

import * as TopActionCreators from '../../action-creators/top-action-creators';
import ClassName from '../../misc/class-name';
import Payment from '../../misc/payment';

import type {RootState} from '../../store/root';

type Props = {
  onPaymentClick: () => void,
};

const className = ClassName('top', 'paymentPage');
const payment = new Payment();

class PaymentPage extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    let buttonElem = null;
    if (payment.isSupportedApplePay) {
      buttonElem = (
        <div className={className('paymentArea')}>
          <button
            className={className('applePay')}
            onClick={this.props.onPaymentClick}
          >
          </button>
        </div>
      );
    } else if (payment.isSupportedGooglePay) {
      buttonElem = (
        <div className={className('paymentArea')}>
          <button
            className={className('googlePay')}
            onClick={this.props.onPaymentClick}
          >
          </button>
        </div>
      );
    } else if (payment.isSupported) {
      buttonElem = (
        <div className={className('paymentArea')}>
          <button
            className={className('cardPay')}
            onClick={this.props.onPaymentClick}
          >
            CardPay!!
          </button>
        </div>
      );
    } else {
      buttonElem = (
        <div className={className('detail')}>
          <p>PaymentRequest Non Suported.</p>
        </div>
      );
    }

    return (
      <div className={className()}>
        <div className={className('section')}>
          <h1 className={className('title')}>
            PaymentRequest
          </h1>
          {buttonElem}
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
    onPaymentClick() {
      payment.pay();
    }
  };
}

export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(PaymentPage);
