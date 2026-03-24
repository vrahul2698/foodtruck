import React from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500&display=swap');

  .cart-page {
    font-family: 'DM Sans', sans-serif;
    display: grid;
    grid-template-columns: 1fr 300px;
    gap: 24px;
    align-items: start;
    padding: 24px 0;
    color: #1a1a18;
  }

  @media (max-width: 680px) {
    .cart-page { grid-template-columns: 1fr; }
  }

  /* ── LEFT: item list ── */
  .order-title {
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 14px;
  }

  .item-list { display: flex; flex-direction: column; gap: 10px; }

  .item-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #fff;
    border: 0.5px solid #e2e0d8;
    border-radius: 12px;
    padding: 12px 14px;
    gap: 12px;
  }

  .item-left { display: flex; align-items: center; gap: 10px; flex: 1; min-width: 0; }

  .item-emoji {
    font-size: 24px;
    width: 44px;
    height: 44px;
    background: #f7f6f2;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .item-info { min-width: 0; }
  .item-name { font-size: 14px; font-weight: 500; color: #1a1a18; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .item-price { font-size: 12px; color: #888882; margin-top: 2px; }

  .qty-row {
    display: flex;
    align-items: center;
    gap: 8px;
    background: #f7f6f2;
    border: 0.5px solid #d4d2ca;
    border-radius: 999px;
    padding: 4px 8px;
    flex-shrink: 0;
  }
  .qty-btn {
    width: 24px; height: 24px;
    border-radius: 50%;
    border: 0.5px solid #d4d2ca;
    background: #fff;
    font-size: 15px;
    color: #1a1a18;
    cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    line-height: 1;
  }
  .qty-btn:hover { background: #eeece8; }
  .qty-num { font-size: 13px; font-weight: 500; min-width: 16px; text-align: center; }

  .item-total { font-size: 13px; font-weight: 500; min-width: 44px; text-align: right; color: #1a1a18; }

  /* ── RIGHT: bill summary ── */
  .summary-card {
    background: #fff;
    border: 0.5px solid #e2e0d8;
    border-radius: 16px;
    padding: 20px;
    position: sticky;
    top: 16px;
  }

  .summary-title { font-size: 15px; font-weight: 500; margin-bottom: 14px; color: #1a1a18; }

  .promo-row { display: flex; gap: 6px; margin-bottom: 16px; }
  .promo-input {
    flex: 1;
    font-size: 13px;
    font-family: 'DM Sans', sans-serif;
    padding: 8px 10px;
    border: 0.5px solid #d4d2ca;
    border-radius: 8px;
    background: #f7f6f2;
    color: #1a1a18;
    outline: none;
  }
  .promo-input::placeholder { color: #b8b6ae; }
  .promo-input:focus { border-color: #aaa89e; }
  .promo-btn {
    font-size: 13px;
    font-weight: 500;
    font-family: 'DM Sans', sans-serif;
    padding: 8px 14px;
    border: 0.5px solid #d4d2ca;
    border-radius: 8px;
    background: #fff;
    color: #1a1a18;
    cursor: pointer;
  }
  .promo-btn:hover { background: #f3f2ee; }

  .bill-rows { display: flex; flex-direction: column; gap: 10px; margin-bottom: 12px; }
  .bill-row  { display: flex; justify-content: space-between; font-size: 13px; }
  .bill-label { color: #888882; }
  .bill-val   { font-weight: 500; color: #1a1a18; }
  .bill-val.free     { color: #3B6D11; }
  .bill-val.discount { color: #3B6D11; }

  .divider { border: none; border-top: 0.5px solid #e2e0d8; margin: 12px 0; }

  .total-row { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 16px; }
  .total-label  { font-size: 14px; font-weight: 500; color: #1a1a18; }
  .total-amount { font-size: 22px; font-weight: 500; color: #1a1a18; }

  .place-order-btn {
    width: 100%;
    padding: 13px;
    background: #1a1a18;
    color: #f7f6f2;
    border: none;
    border-radius: 10px;
    font-size: 14px;
    font-weight: 500;
    font-family: 'DM Sans', sans-serif;
    cursor: pointer;
  }
  .place-order-btn:hover  { opacity: 0.85; }
  .place-order-btn:active { transform: scale(0.99); }

  .savings-pill {
    margin-top: 10px;
    background: #EAF3DE;
    color: #27500A;
    font-size: 12px;
    font-weight: 500;
    padding: 7px 12px;
    border-radius: 8px;
    text-align: center;
  }
`;


export default function CartPage({
    cartItems,
    promoCode = "",
    discount = 0,
    deliveryFee = 0,
    onAdd,
    onRemove,
    onPromoChange,
    onPromoApply,
    onPlaceOrder,
}) {
    const subtotal = cartItems.reduce((s, i) => s + i.price * i.quantity, 0);
    const gst = Math.round(subtotal * 0.05);
    const grandTotal = subtotal + deliveryFee + gst - discount;

    return (
        <>
            <style>{styles}</style>
            <div className="cart-page">

                {/* ── LEFT: order items ── */}
                <div>
                    <p className="order-title">Order items</p>
                    <div className="item-list">
                        {cartItems.map((item) => (
                            <div className="item-row" key={item._id}>
                                <div className="item-left">
                                    <div className="item-emoji">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "8px" }}
                                        />
                                    </div>
                                    <div className="item-info">
                                        <p className="item-name">{item.name}</p>
                                        <p className="item-price">₹{item.price} each</p>
                                    </div>
                                </div>

                                <div className="qty-row">
                                    <button className="qty-btn" onClick={() => onRemove && onRemove(item._id)}>−</button>
                                    <span className="qty-num">{item.quantity}</span>
                                    <button className="qty-btn" onClick={() => onAdd && onAdd(item)}>+</button>
                                </div>

                                <span className="item-total">₹{item.price * item.quantity}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── RIGHT: bill summary ── */}
                <div>
                    <div className="summary-card">
                        <p className="summary-title">Bill summary</p>

                        <div className="promo-row">
                            <input
                                className="promo-input"
                                placeholder="Promo code"
                                value={promoCode}
                                onChange={(e) => onPromoChange && onPromoChange(e.target.value)}
                            />
                            <button className="promo-btn" onClick={onPromoApply}>Apply</button>
                        </div>

                        <div className="bill-rows">
                            <div className="bill-row">
                                <span className="bill-label">Item total</span>
                                <span className="bill-val">₹{subtotal}</span>
                            </div>
                            <div className="bill-row">
                                <span className="bill-label">Delivery fee</span>
                                <span className={`bill-val ${deliveryFee === 0 ? "free" : ""}`}>
                                    {deliveryFee === 0 ? "Free" : `₹${deliveryFee}`}
                                </span>
                            </div>
                            <div className="bill-row">
                                <span className="bill-label">GST (5%)</span>
                                <span className="bill-val">₹{gst}</span>
                            </div>
                            {discount > 0 && (
                                <div className="bill-row">
                                    <span className="bill-label">Promo discount</span>
                                    <span className="bill-val discount">− ₹{discount}</span>
                                </div>
                            )}
                        </div>

                        <hr className="divider" />

                        <div className="total-row">
                            <span className="total-label">To pay</span>
                            <span className="total-amount">₹{grandTotal}</span>
                        </div>

                        <button className="place-order-btn" onClick={onPlaceOrder}>
                            Place order
                        </button>

                        {discount > 0 && (
                            <div className="savings-pill">You saved ₹{discount} on this order</div>
                        )}
                    </div>
                </div>

            </div>
        </>
    );
}
