// @flow

class Payment {
  constructor() {
    this.isSupported = window.PaymentRequest != null;
    this.isSupportedApplePay = window.PaymentRequest != null && window.ApplePaySession && ApplePaySession.canMakePayments();
    this.isSupportedGooglePay = window.PaymentRequest != null && navigator.userAgent.match(/Android/i);
  }

  getSampleMethods() {
    const paymentMethods = [];

    if (this.isSupportedApplePay) {
      paymentMethods.push({
        supportedMethods: "https://apple.com/apple-pay",
        data: {
          version: 3,
          merchantIdentifier: "merchant.com.example",
          merchantCapabilities: ["supports3DS", "supportsCredit", "supportsDebit"],
          supportedNetworks: ["amex", "discover", "masterCard", "visa"],
          countryCode: "JP",
        },
      });
    } else if (this.isSupportedGooglePay) {
      paymentMethods.push({
        supportedMethods: "https://google.com/pay",
      });
    } else if (this.isSupported) {
      paymentMethods.push({
        supportedMethods: ['basic-card'],
        data: {
          supportedNetworks: [
            'visa', 'mastercard', 'amex', 'discover', 'diners', 'jcb', 'unionpay'
          ]
        }
      });
    }

    return paymentMethods;
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
      requestShipping: true,
      shippingType: "shipping",
    };

    return paymentOptions;
  }

  pay() {
    if (!this.isSupported) {
      return;
    }

    try {
      const paymentMethods = this.getSampleMethods();
      const paymentDetails = this.getSampleDetails();
      const paymentOptions = this.getSampleOptions();
      const request = new PaymentRequest(paymentMethods, paymentDetails, paymentOptions);

      request.onmerchantvalidation = function (event) {
        const sessionPromise = fetchPaymentSession(event.validationURL);
        event.complete(sessionPromise);
      };

      request.show().then(result => {
        // TODO: 認証のとこやってないから決済できない
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
    } catch (e) {
      console.log(e);
      return result.complete('fail');
    }
  }
}

export default Payment;
