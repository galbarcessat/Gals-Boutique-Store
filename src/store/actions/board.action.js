import { store } from '../store'
import { ADD_PRODUCT, ADD_ITEM_TO_CART, IS_CART_OPEN, REMOVE_PRODUCT, REMOVE_ITEM_FROM_CART, SET_PRODUCTS, UPDATE_PRODUCTS, UPDATE_CART } from '../reducers/board.reducer'
import { productService } from '../../services/board.service.local'
import { showSuccessMsg } from '../../services/event-bus.service'


//General Board Actions
export async function loadProducts() {
    try {
        const products = await productService.query()
        console.log('Products from DB:', products)
        store.dispatch({ type: SET_PRODUCTS, products: products })
    } catch (err) {
        console.log('Board Actions: err in Loading Boards', err)
        throw err
    }
}

export async function getBoardById(boardId, filterBy, sortBy) {
    try {
        const board = await productService.getBoardById(boardId, filterBy, sortBy)
        store.dispatch({ type: SET_BOARD, board })
    } catch (err) {
        console.log('Board Actions: err in Getting Board', err)
        throw err
    }
}

export function getProductById(productId) {
    const products = store.getState().boardModule.products
    console.log('products:', products)
    return products.find(product => product._id === productId)
}

export async function deleteProduct(productId) {
    try {
        await productService.remove(productId)
        store.dispatch({ type: REMOVE_PRODUCT, productId })
        console.log('deleted product:')

    } catch (error) {
        console.log('error:', error)
        throw error
    }
}

export async function addProduct(product) {
    try {
        let newProduct = await productService.save(product)
        store.dispatch({ type: ADD_PRODUCT, product: newProduct })
        return newProduct
    } catch (error) {
        console.log('error:', error)
        throw error
    }
}

export async function updateProduct(product) {
    try {
        const updatedProduct = await productService.update(product)
        store.dispatch({ type: UPDATE_PRODUCTS, product: updatedProduct })

    } catch (error) {
        console.log('error updating product:', error)
        throw error
    }
}

export function addToCart(ev, product) {
    ev.stopPropagation()
    const productsInCart = store.getState().boardModule.shoppingCart
    let productFromCart = productsInCart.find(item => item._id === product._id)
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
    // showSuccessMsg('Added product to cart')
}

export function onChangeAmount(action, product) {
    if (action === '-') {
        if (product.amount === 1) {
            onRemoveCartProduct(product)
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
    console.log('product:', product)
    store.dispatch({
        type: REMOVE_ITEM_FROM_CART, productId: product._id
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