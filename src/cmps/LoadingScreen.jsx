import Loader from '../assets/imgs/Loader.gif'

export function LoadingScreen() {
    return (
        <div className='loader-container'>
            <img src={Loader} alt="" />
        </div>
    )
}
