export const SET_PRODUCTS = 'SET_PRODUCTS'
export const UPDATE_PRODUCTS = 'UPDATE_PRODUCTS'
export const REMOVE_PRODUCT = 'REMOVE_PRODUCT'
export const ADD_PRODUCT = 'ADD_PRODUCT'

export const SET_CATEGORY = 'SET_CATEGORY'

export const IS_CART_OPEN = 'IS_CART_OPEN'

export const SET_SHOPPING_CART = 'SET_SHOPPING_CART'
export const REMOVE_ITEM_FROM_CART = 'REMOVE_ITEM_FROM_CART'
export const ADD_ITEM_TO_CART = 'ADD_ITEM_TO_CART'
export const UPDATE_CART = 'UPDATE_CART'

export const SET_IS_LOADING = 'SET_IS_LOADING'

const initialState = {
    products: [],
    selectedCategory: null,
    shoppingCart: [],
    isCartOpen: false,
    isLoading: false
}

export function productReducer(state = initialState, action) {
    let newProducts
    let newShoppingCart
    switch (action.type) {
        case SET_PRODUCTS:
            return { ...state, products: action.products }

        case REMOVE_PRODUCT:
            newProducts = state.products.filter(product => product._id !== action.productId)
            console.log('newProducts in reducer:', newProducts)
            return { ...state, products: newProducts }

        case ADD_PRODUCT:
            newProducts = [...state.products, action.product]
            return { ...state, products: newProducts }

        case UPDATE_PRODUCTS:
            newProducts = state.products.map(product => (product._id === action.product._id ? action.product : product))
            return { ...state, products: newProducts }

        case SET_CATEGORY:
            return { ...state, selectedCategory: action.selectedCategory }

        case IS_CART_OPEN:
            return { ...state, isCartOpen: action.isCartOpen }

        case SET_SHOPPING_CART:
            return { ...state, shoppingCart: action.shoppingCart }

        case REMOVE_ITEM_FROM_CART:
            newShoppingCart = state.shoppingCart.filter(product => product._id !== action.productId)
            return { ...state, shoppingCart: newShoppingCart }

        case ADD_ITEM_TO_CART:
            newShoppingCart = [...state.shoppingCart, action.product]
            return { ...state, shoppingCart: newShoppingCart }

        case UPDATE_CART:
            newShoppingCart = state.shoppingCart.map(product => (product._id === action.product._id ? action.product : product))
            return { ...state, shoppingCart: newShoppingCart }

        case SET_IS_LOADING:
            return { ...state, isLoading: action.isLoading }

        default:
            return { ...state }

    }
}
