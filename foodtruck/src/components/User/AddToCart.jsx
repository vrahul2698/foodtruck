import React, { useState } from 'react'
import CartPage from './Cartpage'
import { useSelector } from 'react-redux';
import { triggerPayment } from '../../services/paymentService';

const AddToCart = () => {
    const [promoCode, setPromoCode] = useState("");
    const [discount] = useState("");
    // const dispatch = useDispatch();
    const cartValues = useSelector((store) => store.cart?.items);
    const restaurantId = useSelector((store) => store.cart?.restaurantId);
    const handleApplyPromo = () => {

    }
    const handleCheckout = async (e) => {
        try {
            const paymentData = {
                amount: e,
                currency: "INR",
                restaurantId
            }
            const paymentResponse = await triggerPayment(paymentData);
            const { amount, keyId, currency, orderId, notes } = paymentResponse.data;
            const options = {
                key: keyId,
                amount,
                currency,
                name: 'Food Truck',
                description: 'Food Order Payment',
                order_id: orderId,
                prefill: {
                    name: notes.firstName + " " + notes.lastName,
                    email: 'rahul@gmial.com',
                    contact: '9999999999'
                },
                theme: {
                    color: '#F37254'
                },
            };
            const rzp = new window.Razorpay(options);
            rzp.open();
            console.log(paymentResponse)
        }
        catch (err) {
            console.log(err, "error in payment")

        }
    }
    return (
        <div style={{ display: "flex", justifyContent: "center", padding: "40px 24px" }}>
            <CartPage
                cartItems={Object.values(cartValues)}
                promoCode={promoCode}
                discount={discount}
                onAdd={""}
                onRemove={""}
                onPromoChange={setPromoCode}
                onPromoApply={handleApplyPromo}
                onPlaceOrder={handleCheckout}
            />
        </div>
    )
}

export default AddToCart