import { CheckoutProductPreview } from "./CheckoutProductPreview";

export function CheckoutList({ products }) {

    if (!products || products.length === 0) return <div className="no-products-in-checkout">Cart is empty.</div>
    return (
        <div className="checkout-list-container">
            <div className="product-titles">
                <h1>PRODUCT</h1>
                <h1>PRICE</h1>
                <h1>QUANTITY</h1>
                <h1>SUBTOTAL</h1>
            </div>
            <div className="products-list">
                {products.map(product => <CheckoutProductPreview key={product._id} product={product} />)}
            </div>
        </div>
    )
}