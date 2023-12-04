import StoreLogo from '../assets/imgs/StoreLogo.png'
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import CoPresentIcon from '@mui/icons-material/CoPresent';
export function Footer() {

    return (
        <div className="footer-container main-layout full">
            <div className="footer-content-container" >
                <div className="nav-logo">
                    <img src={StoreLogo} alt="" />
                    <h1>Gal Design <span>.</span></h1>
                </div>
                <div className='social-media-links'>
                    <LinkedInIcon titleAccess='Linkedin' fontSize="large" className='icon' />
                    <GitHubIcon titleAccess='Github' fontSize="large" className='icon' />
                    <CoPresentIcon titleAccess='Personal Website' fontSize="large" className='icon' />
                </div>
            </div>
            <p>©2023 Copyright Made by Gal Ben Natan. All Rights Reserved.</p>
        </div>
    )
}