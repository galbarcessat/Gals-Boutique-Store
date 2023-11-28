export const SET_BOARDS = 'SET_BOARDS'
export const UPDATE_BOARDS = 'UPDATE_BOARDS'
export const REMOVE_BOARD = 'REMOVE_BOARD'
export const ADD_BOARD = 'ADD_BOARD'

export const SET_CATEGORY = 'SET_CATEGORY'

export const IS_CART_OPEN = 'IS_CART_OPEN'

export const SET_SHOPPING_CART = 'SET_SHOPPING_CART'
export const REMOVE_ITEM_FROM_CART = 'REMOVE_ITEM_FROM_CART'
export const ADD_ITEM_TO_CART = 'ADD_ITEM_TO_CART'
export const UPDATE_CART = 'UPDATE_CART'

export const SET_IS_LOADING = 'SET_IS_LOADING'

const initialState = {
    boards: [],
    selectedCategory: null,
    shoppingCart: [],
    isCartOpen: false,
    isLoading: false
}

export function boardReducer(state = initialState, action) {
    let newBoards
    let newShoppingCart
    switch (action.type) {
        case SET_BOARDS:
            return { ...state, boards: action.boards }

        case REMOVE_BOARD:
            newBoards = state.boards.filter(board => board._id !== action.boardId)
            return { ...state, boards: newBoards }

        case ADD_BOARD:
            newBoards = [...state.boards, action.board]
            return { ...state, boards: newBoards }

        case UPDATE_BOARDS:
            newBoards = state.boards.map(board => (board._id === action.board._id ? action.board : board))
            return { ...state, boards: newBoards }

        case SET_CATEGORY:
            return { ...state, selectedCategory: action.selectedCategory }

        case IS_CART_OPEN:
            return { ...state, isCartOpen: action.isCartOpen }

        case SET_SHOPPING_CART:
            return { ...state, shoppingCart: action.shoppingCart }

        case REMOVE_ITEM_FROM_CART:
            newShoppingCart = state.shoppingCart.filter(product => product.id !== action.productId)
            console.log('newShoppingCart:', newShoppingCart)
            return { ...state, shoppingCart: newShoppingCart }

        case ADD_ITEM_TO_CART:
            newShoppingCart = [...state.shoppingCart, action.product]
            return { ...state, shoppingCart: newShoppingCart }

        case UPDATE_CART:
            newShoppingCart = state.shoppingCart.map(product => (product.id === action.product.id ? action.product : product))
            return { ...state, shoppingCart: newShoppingCart }

        case SET_IS_LOADING:
            return { ...state, isLoading: action.isLoading }

        default:
            return { ...state }

    }
}
