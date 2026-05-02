import { useState } from "react";
import PaymentsService from "../infra/services/payments";

type useGetPaymentsPublishableKeyReturnType = [
  () => Promise<void>,
  { data?: string; error: boolean; loading: boolean }
];

const useGetPaymentsPublishableKey = (): useGetPaymentsPublishableKeyReturnType => {
  const [data, setData] = useState<string>();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetch = async () => {
    try {
      setLoading(true);
      const data = await PaymentsService.getPublishableKey();
      setData(data);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return [fetch, { data, error, loading }];
};

export default useGetPaymentsPublishableKey;
