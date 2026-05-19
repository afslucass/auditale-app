import { StripeProvider } from "@stripe/stripe-react-native";
import React, { PropsWithChildren, useContext, useEffect } from "react";
import useGetPaymentsPublishableKey from "../hooks/useGetPaymentsPublishableKey";

const PaymentsContext = React.createContext(null);

export const PaymentsProvider = ({ children }: PropsWithChildren) => {
  const [fetchPublishableKey, { data }] = useGetPaymentsPublishableKey();

  useEffect(() => {
    fetchPublishableKey();
  }, []);

  return (
    <PaymentsContext.Provider value={null}>
      {/* <StripeProvider 
          // publishableKey={data}
          merchantIdentifier={process.env.IOS_MERCHANT_IDENTIFIER} // required for Apple Pay
          urlScheme={process.env.PAYMENTS_URL_SCHEME}// required for 3D Secure and bank redirects
        >
        {children as any}
      </StripeProvider> */}
      {children as any}
    </PaymentsContext.Provider>
  );
};

export const usePaymentsContext = () => useContext(PaymentsContext);

// adicionar essa etapa: https://docs.stripe.com/google-pay?platform=react-native#react-native-create-enable-google-pay
// no mac eu tenho as pastar android e ios, versionar elas
