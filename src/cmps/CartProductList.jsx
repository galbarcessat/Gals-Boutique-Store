import { CartProductPreview } from "./CartProductPreview"

export function CartProductList({ cartProducts }) {

    function getTotalProductsPrice() {
        return cartProducts.map(product => product.amount * product.price).reduce((acc, price) => {
            return acc + price
        }, 0)
    }

    return (
        <>
            {cartProducts.map(product => <CartProductPreview key={product.id} product={product} />)}
            <div className="cart-products-total-price"><span>Total : </span> <span>$ {getTotalProductsPrice()}</span></div>
        </>
    )
}