import CartIcon from '../assets/imgs/CartIcon.png'
import StoreLogo from '../assets/imgs/StoreLogo.png'
import { useNavigate } from 'react-router-dom';
import { IS_CART_OPEN, SET_CATEGORY } from '../store/reducers/board.reducer';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar } from '@mui/material';

export function HomeNavBar() {
    const shoppingCart = useSelector(state => state.boardModule.shoppingCart)
    const user = useSelector(state => state.userModule.user)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    function navToHomePage() {
        dispatch({
            type: SET_CATEGORY, selectedCategory: null
        })
        navigate('/')
    }

    function getCartAmount() {
        if (shoppingCart.length === 0) return 0
        else return shoppingCart.reduce((acc, product) => {
            return acc + product.amount
        }, 0)
    }

    function openCart() {
        dispatch({ type: IS_CART_OPEN, isCartOpen: true })
    }
    console.log('user:', user)
    return (
        <div className="nav-bar-contianer main-layout full">
            <div className='nav-bar-inner-container'>
                <div className="nav-logo" onClick={navToHomePage}>
                    <img src={StoreLogo} alt="" />
                    <h1>Gal Design <span>.</span></h1>
                </div>

                <div className='buttons-container'>

                    {!user ?
                        <div onClick={() => navigate('/login')} className='btn-login'>Log in</div>
                        :
                        <div className='user-avatar'>
                            <Avatar alt={user.username} src={user.ImgUrl} />
                        </div>
                    }

                    <div className='cart-icon-container' onClick={() => openCart()}>
                        <img className='cart-icon' src={CartIcon} alt="" />
                        <div className='cart-items-counter'>{getCartAmount()}</div>
                    </div>
                </div>

            </div>
        </div>
    )
}