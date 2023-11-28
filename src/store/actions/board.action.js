import { store } from '../store'
import { ADD_BOARD, ADD_ITEM_TO_CART, IS_CART_OPEN, REMOVE_BOARD, REMOVE_ITEM_FROM_CART, SET_BOARDS, UPDATE_BOARDS, UPDATE_CART } from '../reducers/board.reducer'
import { boardService } from '../../services/board.service.local'
import { showSuccessMsg } from '../../services/event-bus.service'


//General Board Actions
export async function loadProducts() {
    try {
        const products = await boardService.query()
        console.log('Products from DB:', products)
        store.dispatch({ type: SET_BOARDS, boards: products })
    } catch (err) {
        console.log('Board Actions: err in Loading Boards', err)
        throw err
    }
}

export async function getBoardById(boardId, filterBy, sortBy) {
    try {
        const board = await boardService.getBoardById(boardId, filterBy, sortBy)
        store.dispatch({ type: SET_BOARD, board })
    } catch (err) {
        console.log('Board Actions: err in Getting Board', err)
        throw err
    }
}

export function getProductById(productId) {
    const products = store.getState().boardModule.boards
    return products.find(product => product.id === productId)
}

export function addToCart(ev, product) {
    ev.stopPropagation()
    const productsInCart = store.getState().boardModule.shoppingCart
    let productFromCart = productsInCart.find(item => item.id === product.id)
    if (productFromCart) {
        productFromCart.amount++
        store.dispatch({
            type: UPDATE_CART, product: productFromCart
        })
    } else {
        let productToCart = { ...product, amount: 1 }
        store.dispatch({
            type: ADD_ITEM_TO_CART, product: productToCart
        })
    }
    showSuccessMsg('Added product to cart')
}
export function onChangeAmount(action, product) {
    if (action === '-') {
        if (product.amount === 1) {
            onRemoveCartProduct()
            return
        }
        product.amount--
    } else if (action === '+') {
        product.amount++
    }

    store.dispatch({
        type: UPDATE_CART, product: product
    })
}

export function onRemoveCartProduct(product) {
    store.dispatch({
        type: REMOVE_ITEM_FROM_CART, productId: product.id
    })
    showSuccessMsg('Product was removed from cart')
}

export function getTotalProductsPrice() {
    return store.getState().boardModule.shoppingCart.map(product => product.amount * product.price).reduce((acc, price) => {
        return acc + price
    }, 0)
}

export function closeCart() {
    store.dispatch({ type: IS_CART_OPEN, isCartOpen: false })
}