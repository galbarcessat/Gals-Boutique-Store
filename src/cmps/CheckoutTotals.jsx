import { getTotalProductsPrice } from "../store/actions/board.action";
import checkoutBadges from '../assets/imgs/checkoutBadges.png'

export function CheckoutTotals() {

    return (
        <div className="cart-totals-container" data-aos="fade-left" data-aos-easing="ease-in-out">
            <h1 className="cart-totals-title">CART TOTALS</h1>
            <div className="subtotal-container">
                <h2>Subtotal</h2>
                <p>$ {getTotalProductsPrice()}</p>
            </div>
            <div className="shipping-container">
                <h2>Shipping</h2>
                <div className="shipping-info">
                    <p>Flat rate : $19.00</p>
                    <p><span>Shipping to </span> IL.</p>
                </div>
            </div>
            <div className="total-container">
                <h1>Total</h1>
                <p>$ {getTotalProductsPrice() + 19}</p>
            </div>
            <button>PROCEED TO CHECKOUT</button>
            <img src={checkoutBadges} alt="" />
        </div>
    )
}