import React, { useState } from 'react'
import CartPage from './Cartpage'
import { useDispatch, useSelector } from 'react-redux';
import { triggerPayment } from '../../services/paymentService';

const AddToCart = () => {
    const [promoCode, setPromoCode] = useState("");
    const [discount, setDiscount] = useState("");
    const dispatch = useDispatch();
    const cartValues = useSelector((store) => store.cart?.items);
    const restaurantId = useSelector((store) => store.cart?.restaurantId);
    console.log(cartValues,restaurantId, "cartValues")
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