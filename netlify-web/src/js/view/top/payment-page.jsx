// @flow

import React from 'react';
import * as ReactRedux from 'react-redux';
import * as Redux from 'redux';

import * as TopActionCreators from '../../action-creators/top-action-creators';
import ClassName from '../../misc/class-name';

import type {RootState} from '../../store/root';

type Props = {
  onPaymentClick: () => void,
};

const className = ClassName('top', 'paymentPage');

class PaymentPage extends React.Component<Props> {
  render() {
    if (!window.PaymentRequest) {
      return (
        <div className={className()}>
          <div className={className('section')}>
            <h1 className={className('title')}>
              PaymentRequest
            </h1>
            <div className={className('detail')}>
              <p>PaymentRequest Non Suported.</p>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className={className()}>
        <div className={className('section')}>
          <h1 className={className('title')}>
            PaymentRequest
          </h1>
          <div className={className('detail')}>
            <button
              onClick={this.props.onPaymentClick}
            >
              payment
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
    onPaymentClick() {
      // Supported payment methods
      const supportedInstruments = [{
        supportedMethods: ['basic-card'],
        data: {
          supportedNetworks: [
            'visa', 'mastercard', 'amex', 'discover',
            'diners', 'jcb', 'unionpay'
          ]
        }
      }];

      // Checkout details
      const details = {
        displayItems: [{
          label: 'Original donation amount',
          amount: { currency: 'USD', value: '65.00' }
        }, {
          label: 'Friends and family discount',
          amount: { currency: 'USD', value: '-10.00' }
        }],
        total: {
          label: 'Total due',
          amount: { currency: 'USD', value : '55.00' }
        }
      };

      const request = new PaymentRequest(supportedInstruments, details);
      request.show().then(result => {
        return fetch('/pay', {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(result.toJSON())
        }).then(response => {
          if (response.status === 200) {
            return result.complete('success');
          } else {
            return result.complete('fail');
          }
        }).catch(() => {
          return result.complete('fail');
        });
      });
    }
  };
}

export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(PaymentPage);
