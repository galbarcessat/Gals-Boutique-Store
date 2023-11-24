import StoreLogo from '../assets/imgs/StoreLogo.png'

export function Footer() {

    return (
        <div className="footer-container main-layout full">
            <div className="footer-content-container" >
                <div className="nav-logo">
                    <img src={StoreLogo} alt="" />
                    <h1>Gal Design <span>.</span></h1>
                </div>
                <div className='social-media-links'>
                    <span>Linkedin</span>
                    <span>Github</span>
                    <span>Personal Website</span>
                </div>
            </div>
            <p>©2023 Copyright Made by Gal Ben Natan. All Rights Reserved.</p>

        </div>
    )
}