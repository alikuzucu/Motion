import {Router} from './routes'
import {useDispatch} from "react-redux";
import useAutoFetch from "./hooks/useAutoFetch.jsx";
import {useEffect} from "react";
import {login_user, logout_user} from "./store/slices/UserSlice.js";
import LoadingSpinner from "./components/LoadingSpinner/LoadingSpinner.jsx";

function App() {
    const dispatch = useDispatch()
    const accessToken = localStorage.getItem('accessToken')


    const {error, loading} = useAutoFetch(accessToken)

    useEffect(() => {
        console.log('error',error)
        if (error === null) {
            dispatch(login_user(accessToken))
        } else {
            dispatch(logout_user())
            localStorage.clear()
        }
    }, [error, accessToken, dispatch])

    if (loading) return <LoadingSpinner/>

    return <Router/>
}

export default App
