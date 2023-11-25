import { useSelector } from "react-redux"

export function ShoppingCart() {
    const shoppingCart = useSelector(state => state.boardModule.shoppingCart)

    return (
        <div className="shopping-cart-container">
            CART HELLO
        </div>
    )
}