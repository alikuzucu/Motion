import {useEffect, useState} from "react";
import {AxiosMotion} from "../axios/Axios.jsx";

const useAutoFetch = (accessToken) => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const handleTokenVerify = async () => {
            setLoading(true);
            try {
                const response = await AxiosMotion.post("/auth/token/verify/", {
                    token: accessToken,
                });
                console.log('response',response)
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        if (accessToken) {
            handleTokenVerify();
        }
    }, []);

    return {error, loading};
};

export default useAutoFetch;
