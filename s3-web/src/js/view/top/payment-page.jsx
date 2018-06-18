// @flow

import React from 'react';
import * as ReactRedux from 'react-redux';
import * as Redux from 'redux';

import ClassName from '../../misc/class-name';
import {ApplePayment, GooglePayment, CreditPayment} from '../../misc/payment';

import type {RootState} from '../../store/root';

type Props = {
  onApplePaymentClick: () => void,
  onGooglePaymentClick: () => void,
  onCreditPaymentClick: () => void,
};

type State = {
  isEnableApplePayment: boolean,
  isEnableGooglePayment: boolean,
  isEnableCreditPayment: boolean,
};

const className = ClassName('top', 'paymentPage');
const applePayment = new ApplePayment();
const googlePayment = new GooglePayment();
const creditPayment = new CreditPayment();

class PaymentPage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      isEnableApplePayment: false,
      isEnableGooglePayment: false,
      isEnableCreditPayment: false,
    };
  }

  componentDidMount() {
    const appleTask = new Promise((resolve, _reject) => {
      applePayment.check((result) => {
        resolve(result);
      });
    });

    const googleTask = new Promise((resolve, _reject) => {
      googlePayment.check((result) => {
        resolve(result);
      });
    });

    const creditTask = new Promise((resolve, _reject) => {
      creditPayment.check((result) => {
        resolve(result);
      });
    });

    Promise.all([appleTask, googleTask, creditTask])
      .then(([isEnableApplePayment, isEnableGooglePayment, isEnableCreditPayment]) => {
        this.setState({
          isEnableApplePayment: isEnableApplePayment,
          isEnableGooglePayment: isEnableGooglePayment,
          isEnableCreditPayment: isEnableCreditPayment,
        });
      }).catch(() => {
        console.log('error');
      });
  }

  render() {
    return (
      <div className={className()}>
        <div className={className('section')}>
          <div className={className('paymentArea')}>
            <div>
              ApplePay: {this.state.isEnableApplePayment ? '決済できる' : '決済できない'}
            </div>
            {applePayment.canDisplayButton() ? (
              <button
                className={className('applePay')}
                onClick={this.props.onApplePaymentClick}
              >
              </button>
              ) : 'Not Supported'}
          </div>
          <div className={className('paymentArea')}>
            <div>
              GooglePay: {this.state.isEnableGooglePayment ? '決済できる' : '決済できない'}
            </div>
            <button
              className={className('googlePay')}
              onClick={this.props.onGooglePaymentClick}
            >
            </button>
          </div>
          <div className={className('paymentArea')}>
            <div>
              クレジット: {this.state.isEnableCreditPayment ? '決済できる' : '決済できない'}
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

function mapStateToProps(_state: RootState) {
  return {
  };
}

function mapDispatchToProps(_dispatch: Redux.Dispatch<*>) {
  return {
    onApplePaymentClick() {
      applePayment.pay();
    },
    onGooglePaymentClick() {
      googlePayment.pay();
    },
    onCreditPaymentClick() {
      creditPayment.pay();
    }
  };
}

export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(PaymentPage);
