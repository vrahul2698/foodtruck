import AxiosInstance from "./AxiosInstance";

export const triggerPayment = async (paymentData) => {
    // Implementation for triggering payment
    const res = AxiosInstance.post('payment/create', paymentData);
    return res;
};