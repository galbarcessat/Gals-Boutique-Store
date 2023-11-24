import CartIcon from '../assets/imgs/CartIcon.png'
import StoreLogo from '../assets/imgs/StoreLogo.png'

export function HomeNavBar() {

    return (
        <div className="nav-bar-contianer main-layout full">
            <div className='nav-bar-inner-container'>
            <div className="nav-logo">
                <img src={StoreLogo} alt="" />
                <h1>Gal Design <span>.</span></h1>
            </div>

            <img src={CartIcon} alt="" />
            </div>
        </div>
    )
}