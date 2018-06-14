// @flow

import React from 'react';
import * as ReactRedux from 'react-redux';
import * as Redux from 'redux';

import ClassName from '../../misc/class-name';
import {ApplePayment, CreditPayment} from '../../misc/payment';

import type {RootState} from '../../store/root';

type Props = {
  onApplePaymentClick: () => void,
  onCreditPaymentClick: () => void,
};

type State = {
  isEnableApplePayment: bool,
  isEnableCreditPayment: bool,
};

const className = ClassName('top', 'paymentPage');
const applePayment = new ApplePayment();
const creditPayment = new CreditPayment();

class PaymentPage extends React.Component<Props> {
  constructor(props: Props) {
    super(props);

    this.state = {
      isEnableApplePayment: false,
      isEnableCreditPayment: false,
    };
  }

  componentDidMount() {
    const appleTask = new Promise((resolve, reject) => {
      applePayment.check((result) => {
        resolve(result);
      });
    });

    const creditTask = new Promise((resolve, reject) => {
      creditPayment.check((result) => {
        resolve(result);
      });
    });

    Promise.all([appleTask, creditTask])
      .then(([isEnableApplePayment, isEnableCreditPayment]) => {
        this.setState({
          isEnableApplePayment: isEnableApplePayment,
          isEnableCreditPayment: isEnableCreditPayment,
        });
      }).catch(() => {
        console.log('error');
      });
  }

  render() {
    let nonSupport = (
      <div className={className('detail')}>
        <p>PaymentRequest Non Suported.</p>
      </div>
    );

    let appleButton = null;
    if (this.state.isEnableApplePayment) {
      nonSupport = null;
      appleButton = (
        <div className={className('paymentArea')}>
          <button
            className={className('applePay')}
            onClick={this.props.onApplePaymentClick}
          >
          </button>
        </div>
      );
    }

    let creditButton = null;
    if (this.state.isEnableCreditPayment) {
      nonSupport = null;
      creditButton = (
        <div className={className('paymentArea')}>
          <button
            className={className('cardPay')}
            onClick={this.props.onCreditPaymentClick}
          >
            CardPay!!
          </button>
        </div>
      );
    }

    return (
      <div className={className()}>
        <div className={className('section')}>
          <div className={className('paymentArea')}>
            <div>
              ApplePay: {this.state.isEnableApplePayment ? "決済できる" : "決済できない"}
            </div>
            {applePayment.canDisplayButton() ? (
              <button
                className={className('applePay')}
                onClick={this.props.onApplePaymentClick}
              >
              </button>
              ) : "Not Supported"}
          </div>
          <div className={className('paymentArea')}>
            <div>
              クレジット: {this.state.isEnableCreditPayment ? "決済できる" : "決済できない"}
            </div>
            <button
              className={className('cardPay')}
              onClick={this.props.onCreditPaymentClick}
            >
              支払う
            </button>
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
    onApplePaymentClick() {
      applePayment.pay();
    },
    onCreditPaymentClick() {
      creditPayment.pay();
    }
  };
}

export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(PaymentPage);
