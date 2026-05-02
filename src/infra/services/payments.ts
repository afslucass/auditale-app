import axios from 'axios'

const getPublishableKey = async () => {
  const res: string = await axios.get(''); // todo: get publishable key from supabase edge func
  return res;
};

const processPaidPlanPayment = async () => {
  const clientSecret: string = await axios.get(''); // todo: get publishable key from supabase edge func
  return clientSecret;
};


const PaymentsService = {
  getPublishableKey,
  processPaidPlanPayment
};

export default PaymentsService;
