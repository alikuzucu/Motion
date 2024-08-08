import {Router} from './routes'
import {useDispatch} from "react-redux";
import useAutoFetch from "./hooks/useAutoFetch.jsx";
import {useEffect} from "react";
import {login_user, logout_user} from "./store/slices/UserSlice.js";
import LoadingSpinner from "./components/LoadingSpinner/LoadingSpinner.jsx";

function App() {

    return <Router/>
}

export default App
