import { useSelector } from "react-redux";
import { CheckoutList } from "../cmps/CheckoutList";
import { CheckoutTotals } from "../cmps/CheckoutTotals";
import { CheckoutReviews } from "../cmps/CheckoutReviews";

export function CheckoutPage() {
    const shoppingCart = useSelector(state => state.boardModule.shoppingCart)

    return (
        <div className="checkout-container main-layout">
            <h1 className="checkout-title">CHECKOUT</h1>
            <div className="checkout-content">
                <div className="left-container" data-aos="fade-right" data-aos-easing="ease-in-out">
                    <CheckoutList products={shoppingCart} />
                    <CheckoutReviews />
                </div>
                <CheckoutTotals />
            </div>

        </div>
    )
}