import { useState } from "react"
import { useDispatch } from "react-redux"
import { REMOVE_ITEM_FROM_CART, UPDATE_CART } from "../store/reducers/board.reducer"

export function CartProductPreview({ product }) {
    const dispatch = useDispatch()

    function onChangeAmount(action) {
        if (action === '-') {
            if (product.amount === 1) {
                onRemoveCartProduct()
                return
            }
            product.amount--
        } else if (action === '+') {
            product.amount++
        }

        dispatch({
            type: UPDATE_CART, product: product
        })
    }

    function onRemoveCartProduct() {
        dispatch({
            type: REMOVE_ITEM_FROM_CART, productId: product.id
        })
    }

    return (
        <div className="cart-product-preview">
            <img src={product.images[0]} alt="" />
            <div className="product-content">

                <div className="upper-container">
                    <h1>{product.title}</h1>
                    <div className="btn-remove-product" onClick={() => onRemoveCartProduct(product)}>
                        <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16" aria-hidden="true" className="icon_ddf5a18e1a noFocusStyle_0270e46215" data-testid="icon"><path d="M3.53033 2.46967C3.23744 2.17678 2.76256 2.17678 2.46967 2.46967C2.17678 2.76256 2.17678 3.23744 2.46967 3.53033L8.97639 10.037L2.47093 16.5425C2.17804 16.8354 2.17804 17.3103 2.47093 17.6032C2.76382 17.8961 3.2387 17.8961 3.53159 17.6032L10.037 11.0977L16.5425 17.6032C16.8354 17.8961 17.3103 17.8961 17.6032 17.6032C17.8961 17.3103 17.8961 16.8354 17.6032 16.5425L11.0977 10.037L17.6044 3.53033C17.8973 3.23744 17.8973 2.76256 17.6044 2.46967C17.3115 2.17678 16.8367 2.17678 16.5438 2.46967L10.037 8.97639L3.53033 2.46967Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
                    </div>
                </div>

                <div className="lower-container">
                    <div className="amount-and-price-container">
                        <div className="product-amount-changer">
                            <span className="btn-change-amount" onClick={() => onChangeAmount('-')}>-</span>
                            <span className="amount-counter">{product.amount}</span>
                            <span className="btn-change-amount" onClick={() => onChangeAmount('+')}>+</span>
                        </div>
                        <span className="product-price">x {product.price}$</span>
                    </div>
                    <span className="product-total-price">{product.amount * product.price}$</span>
                </div>

            </div>
        </div>
    )
}