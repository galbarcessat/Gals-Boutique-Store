import { useDispatch } from 'react-redux';
import HeroImg from '../assets/imgs/HeroImg.png'
import { useNavigate } from 'react-router-dom';
import { SET_CATEGORY } from '../store/reducers/board.reducer';

export function HomeHero() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    function navToProductPage() {
        dispatch({
            type: SET_CATEGORY, selectedCategory: null
        })
        navigate('/product')
    }

    return (
        <section className="home-hero-container main-layout full">
            <div className="hero-inner-container">

                <div className="hero-text">
                    <h1>Gal Design</h1>
                    <div className="main-p">
                        <p>Find the best</p>
                        <p>fashion style</p>
                        <p>for you</p>
                    </div>
                    <button onClick={navToProductPage}>SHOP NOW</button>
                </div>
                <img src={HeroImg} alt="" />
            </div>
        </section>
    )
}