import CartIcon from '../assets/imgs/CartIcon.png'
import StoreLogo from '../assets/imgs/StoreLogo.png'
import { useNavigate } from 'react-router-dom';
import { IS_CART_OPEN, SET_CATEGORY } from '../store/reducers/board.reducer';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Tooltip } from '@mui/material';
import { useState } from 'react';

export function HomeNavBar() {
    const shoppingCart = useSelector(state => state.boardModule.shoppingCart)
    const user = useSelector(state => state.userModule.user)

    const [scrolled, setScrolled] = useState(false)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    window.onscroll = function handleScroll() {
        const isScrolled = window.scrollY > 0
        setScrolled(isScrolled)
    }

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

    return (
        <div className={"nav-bar-contianer main-layout full " + (scrolled ? 'scrolled' : '')}>
            <div className='nav-bar-inner-container'>
                <div className="nav-logo" onClick={navToHomePage}>
                    <img src={StoreLogo} alt="" />
                    <h1>Gal Design <span>.</span></h1>
                </div>

                <div className='buttons-container'>

                    {!user ?
                        <div onClick={() => navigate('/login')} className='btn-nav'>Log in</div>
                        :
                        <div className='user-container'>
                            {user.isAdmin && <div onClick={() => navigate('/admin')} className='btn-nav'>Admin Panel</div>}
                            <Tooltip title={user.username} arrow>
                                <Avatar
                                    onClick={() => navigate('/user')}
                                    className='user-avatar'
                                    alt={user.username}
                                    src={user.imgUrl}
                                    sx={{ width: 30, height: 30 }}
                                />
                            </Tooltip>
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