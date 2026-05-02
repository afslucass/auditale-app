import { useState } from "react";
import PaymentsService from "../infra/services/payments";
import { PlatformPay, usePlatformPay } from "@stripe/stripe-react-native";
import { Alert } from "react-native";
import { useSystemContext } from "../contexts/system";

type useProcessPaidPlanPaymentReturnType = [
  () => Promise<void>,
  { success: boolean; error: boolean; loading: boolean }
];

const useProcessPaidPlanPayment = (): useProcessPaidPlanPaymentReturnType => {
  const { isPlatformPaySupported, confirmPlatformPayPayment } = usePlatformPay();
  const {texts} = useSystemContext()

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchPaymentIntentClientSecret = async () => {
    if (!(await isPlatformPaySupported({ googlePay: {testEnv: !process.env.PAYMENTS_ENV_IS_PROD} }))) {
      Alert.alert('Google Pay is not supported.');
      return;
    }
    const clientSecret = await PaymentsService.processPaidPlanPayment();
    return clientSecret;
  };

  const fetch = async () => {
    try {
      const clientSecret = await fetchPaymentIntentClientSecret();
      if (clientSecret) {
        const { error, paymentIntent } = await confirmPlatformPayPayment(
          clientSecret,
          {
            googlePay: {
              testEnv: !process.env.PAYMENTS_ENV_IS_PROD,
              merchantName: texts.CONSTANTS.APP_NAME,
              merchantCountryCode: 'BR',
              currencyCode: 'BRL',
              billingAddressConfig: {
                format: PlatformPay.BillingAddressFormat.Full,
                isPhoneNumberRequired: true,
                isRequired: true,
              },
              },
          }
        ); 
        if(error) {
          setError(true);
        }
        if(paymentIntent){
          setSuccess(true);
        }
      }
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return [fetch, { success, error, loading }];
};

export default useProcessPaidPlanPayment;
