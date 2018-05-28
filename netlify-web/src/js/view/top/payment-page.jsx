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
  constructor(props: Props) {
    super(props);
  }

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
      const isSupported = window.PaymentRequest != null;
      const isSupportedApple = isSupported && window.ApplePaySession && ApplePaySession.canMakePayments();
      if (isSupportedApple) {
        try {
          const applePayMethod = {
            supportedMethods: "https://apple.com/apple-pay",
            data: {
              version: 3,
              merchantIdentifier: "merchant.com.example",
              merchantCapabilities: ["supports3DS", "supportsCredit", "supportsDebit"],
              supportedNetworks: ["amex", "discover", "masterCard", "visa"],
              countryCode: "US",
            },
          };

          const paymentDetails = {
            total: {
              label: "My Merchant",
              amount: { value: "27.50", currency: "USD" },
            },
            displayItems: [{
              label: "Tax",
              amount: { value: "2.50", currency: "USD" },
            }, {
              label: "Ground Shipping",
              amount: { value: "5.00", currency: "USD" },
            }],
            shippingOptions: [{
              id: "ground",
              label: "Ground Shipping",
              amount: { value: "5.00", currency: "USD" },
              selected: true,
            }, {
              id: "express",
              label: "Express Shipping",
              amount: { value: "10.00", currency: "USD" },
            }],
          };

          const paymentOptions = {
            requestPayerName: true,
            requestPayerEmail: true,
            requestPayerPhone: true,
            requestShipping: true,
            shippingType: "shipping",
          };

          const request = new PaymentRequest([applePayMethod], paymentDetails, paymentOptions);

          request.onmerchantvalidation = function (event) {
            // Have your server fetch a payment session from event.validationURL.
            const sessionPromise = fetchPaymentSession(event.validationURL);
            event.complete(sessionPromise);
          };

          request.onshippingoptionchange = function (event) {
            // Compute new payment details based on the selected shipping option.
            const detailsUpdatePromise = computeDetails();
            event.updateWith(detailsUpdatePromise);
          };

          request.onshippingaddresschange = function (event) {
            // Compute new payment details based on the selected shipping address.
            const detailsUpdatePromise = computeDetails();
            event.updateWith(detailsUpdatePromise);
          };

          request.show().then(result => {
            console.log("result");
            console.log(result);
          });
//      const response = await request.show();
//      const status = processResponse(response);
//      response.complete(status);
        } catch (e) {
          console.log(e);
        }

        return;
     }

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
