import { useDispatch, useSelector } from "react-redux"
import CartIcon from '../assets/imgs/CartIcon.png'
import CloseIcon from '@mui/icons-material/Close';
import { CartProductList } from "./CartProductList"
import { useNavigate } from "react-router-dom";
import { closeCart, getTotalProductsPrice } from "../store/actions/board.action"

export function ShoppingCart() {
    const shoppingCart = useSelector(state => state.boardModule.shoppingCart)
    const isCartOpen = useSelector(state => state.boardModule.isCartOpen)
    const navigate = useNavigate()

    function onCheckout() {
        navigate('/checkout')
        closeCart()
    }

    return (
        <div className={"shopping-cart-container " + (isCartOpen ? 'open' : '')}>
            <div onClick={() => closeCart()} className="btn-exit-cart">
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
                <button onClick={() => onCheckout()} className="btn-checkout">CHECKOUT</button>
            </div>}
        </div>
    )
}