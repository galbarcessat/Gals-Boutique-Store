import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { logout } from "../store/actions/user.actions"
import { LoadingScreen } from "../cmps/LoadingScreen"

export function UserDetails() {
    const user = useSelector(state => state.userModule.user)
    const navigate = useNavigate()

    function onLogout() {
        logout()
        navigate('/')
    }
    if (!user) return <LoadingScreen />
    return (
        <div className="user-details-container">
            <img src={user.imgUrl} alt={user.username} />
            <div className="user-content">
                <h1>Username : {user.username}</h1>
                <div className="user-details-btns">
                    <div onClick={() => onLogout()} className="btn-logout">Logout</div>
                    <div onClick={() => navigate('/')} className="btn-shopping">Go back to shopping</div>
                </div>
            </div>
        </div>
    )
}
