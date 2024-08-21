import { useState } from "react";
import axios from "axios";

const useApiRequest = (options = { auth: true }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  axios.defaults.baseURL = "http://localhost:8000/backend/api/";

  const sendRequest = (method, url, requestData, isFormData) => {
    setLoading(true);
    setData(null);
    setError(null);
    axios.defaults.headers.common["Content-Type"] = isFormData
      ? "multipart/form-data"
      : "application/json";

    if (options.auth === true) {
      console.log("going to set the AUTH");
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + localStorage.getItem("accessToken");
    } else {
      axios.defaults.headers.common["Authorization"] = undefined;
    }

    axios({ method, url, data: requestData })
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          if (Object.keys(response.data).length === 0) {
            return setData("success");
          } else {
            return setData(response.data);
          }
        }
      })
      .catch((error) => {
        setError(error.response.data);
      })
      .finally(() => setLoading(false));
  };
  return { sendRequest, data, error, loading };
};

export default useApiRequest;
