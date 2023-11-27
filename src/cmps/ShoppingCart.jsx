import { useSelector } from "react-redux"
import CartIcon from '../assets/imgs/CartIcon.png'
import CloseIcon from '@mui/icons-material/Close';
import { CartProductList } from "./CartProductList"

export function ShoppingCart({ setIsCartOpen, isCartOpen }) {
    const shoppingCart = useSelector(state => state.boardModule.shoppingCart)
    console.log('isCartOpen:', isCartOpen)

    // useEffect(() => {
    //     document.addEventListener('mousedown', onCloseCart)
    //     return () => {
    //         document.removeEventListener('mousedown', onCloseCart)
    //     }
    // }, [])

    // function onCloseCart(ev) {
    //     if (ev.target.closest('.shopping-cart-container')) return
    //     setIsCartOpen(false)
    // }

    return (
        <div className={"shopping-cart-container " + (isCartOpen ? 'open' : '')}>
            <div onClick={() => setIsCartOpen(false)} className="btn-exit-cart">
            <CloseIcon/>
            </div>
            <div className="cart-header">
                <img src={CartIcon} alt="" />
                <h1>Shopping Cart</h1>
            </div>
            <div className="cart-body">
                {shoppingCart.length > 0 && <CartProductList cartProducts={shoppingCart} />}
                {shoppingCart.length === 0 && <div className="empty-cart-text">Cart is empty.</div>}
            </div>
        </div>
    )
}