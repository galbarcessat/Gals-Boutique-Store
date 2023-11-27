import { useSelector } from "react-redux"
import CartIcon from '../assets/imgs/CartIcon.png'
import CloseIcon from '@mui/icons-material/Close';
import { CartProductList } from "./CartProductList"

export function ShoppingCart({ setIsCartOpen, isCartOpen }) {
    const shoppingCart = useSelector(state => state.boardModule.shoppingCart)

    function getTotalProductsPrice() {
        return shoppingCart.map(product => product.amount * product.price).reduce((acc, price) => {
            return acc + price
        }, 0)
    }

    return (
        <div className={"shopping-cart-container " + (isCartOpen ? 'open' : '')}>
            <div onClick={() => setIsCartOpen(false)} className="btn-exit-cart">
                <CloseIcon />
            </div>
            <div className="cart-header">
                <img src={CartIcon} alt="" />
                <h1>Shopping Cart</h1>
            </div>

            <div className="cart-body">
                {shoppingCart.length > 0 && <CartProductList cartProducts={shoppingCart} />}
                {shoppingCart.length === 0 && <div className="empty-cart-text">Cart is empty.</div>}
            </div>

            {shoppingCart.length > 0 && <div className="cart-footer">
                <div className="cart-products-total-price"><span>Total : </span> <span>$ {getTotalProductsPrice()}</span></div>
                <button className="btn-checkout">CHECKOUT</button>
            </div>}
        </div>
    )
}