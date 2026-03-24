import React, { useState } from 'react'
import CartPage from './Cartpage'
import { useDispatch, useSelector } from 'react-redux';

const AddToCart = () => {
    const [promoCode, setPromoCode] = useState("");
    const [discount, setDiscount] = useState("");
    const dispatch = useDispatch();
    const cartValues = useSelector((store) => store.cart?.items);
    const handleApplyPromo=()=>{

    }
    const handleCheckout=()=>{

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