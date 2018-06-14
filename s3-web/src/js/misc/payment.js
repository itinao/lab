// @flow

class Payment {
  constructor() {
  }

  check(callback) {
    if (!window.PaymentRequest) {
      callback(false);
      return;
    }

    const request = this.createPaymentRequest();
    request.canMakePayment()
      .then((result) => {
        callback(result);
      }).catch((err) => {
        console.error(err);
        callback(false);
      });
  }

  getSampleMethods() {
    return [];
  }

  getSampleDetails() {
    const amount = 100;
    const tax = amount * 0.08;
    const totalAmount = amount + tax;

    const paymentDetails = {
      total: {
        label: "Lab PWA",
        amount: {
          value: totalAmount,
          currency: "JPY"
        },
      },
      displayItems: [
        {
          label: "Donation Amount",
          amount: {
            value: amount,
            currency: "JPY"
          }
        },
        {
          label: "TAX",
          amount: {
            value: tax,
            currency: "JPY"
          }
        },
      ],
    };

    return paymentDetails;
  }

  getSampleOptions() {
    const paymentOptions = {
      requestPayerName: true,
      requestPayerEmail: true,
      requestPayerPhone: true,
      requestShipping: false,
    };

    return paymentOptions;
  }

  createPaymentRequest() {
    const paymentMethods = this.getSampleMethods();
    const paymentDetails = this.getSampleDetails();
    const paymentOptions = this.getSampleOptions();
    return new PaymentRequest(paymentMethods, paymentDetails, paymentOptions);
  }

  pay() {
    try {
      const request = this.createPaymentRequest();

      request.onmerchantvalidation = function (event) {
        const sessionPromise = fetchPaymentSession(event.validationURL);
        event.complete(sessionPromise);
      };

      request.show().then(result => {
        // TODO: 決済しないよ
        console.log(result);
        return result.complete('success');
      }).catch((e) => {
        console.error("payment failed: " + e);
      });
    } catch (e) {
      alert("payment failed: " + e);
      return result.complete('fail');
    }
  }
}

export class ApplePayment extends Payment {
  constructor() {
    super();
  }

  canDisplayButton() {
    return window.PaymentRequest != null && window.ApplePaySession && ApplePaySession.canMakePayments();
  }

  check(callback) {
    if (!this.canDisplayButton()) {
      callback(false);
      return;
    }

    super.check(callback);
  }

  getSampleMethods() {
    return [{
      supportedMethods: "https://apple.com/apple-pay",
      data: {
        version: 3,
        merchantIdentifier: "merchant.com.example",
        merchantCapabilities: ["supports3DS", "supportsCredit", "supportsDebit"],
        supportedNetworks: ["amex", "discover", "masterCard", "visa"],
        countryCode: "JP",
      },
    }];
  }
}

/*
export class GooglePayment extends Payment {
  constructor() {
    super();
  }

  getSampleMethods() {
    return [{
      supportedMethods: "https://google.com/pay",
      data: {
        apiVersion: 1,
        environment: 'TEST',
        merchantId: '01234567890123456789',
        paymentMethodTokenizationParameters: {
          tokenizationType: 'PAYMENT_GATEWAY',
          parameters: {}
        },
        allowedPaymentMethods: ['CARD', 'TOKENIZED_CARD'],
        cardRequirements: {
          allowedCardNetworks: ['AMEX', 'DISCOVER', 'MASTERCARD', 'VISA']
        }
      },
    }];
  }
}
*/

export class CreditPayment extends Payment {
  constructor() {
    super();
  }

  getSampleMethods() {
    return [{
      supportedMethods: ['basic-card'],
      data: {
        supportedNetworks: [
          'visa', 'mastercard', 'amex', 'discover', 'diners', 'jcb', 'unionpay'
        ]
      }
    }];
  }
}
