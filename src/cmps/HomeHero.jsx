import HeroImg from '../assets/imgs/HeroImg.png'

export function HomeHero() {

    return (
        <section className="home-hero-container main-layout full">
            <div className="hero-inner-container">

                <div className="hero-text">
                    <h1>Gal's Boutique</h1>
                    <div className="main-p">
                        <p>Find the best</p>
                        <p>fashion style</p>
                        <p>for you</p>
                    </div>
                    <button>SHOP NOW</button>
                </div>
                <img src={HeroImg} alt="" />
            </div>
        </section>
    )
}