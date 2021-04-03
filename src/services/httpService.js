import axios from "axios";
import { toast } from "react-toastify";
axios.interceptors.response.use(null, (error) => {
  if (
    error.response &&
    error.response.staus >= 400 &&
    error.response.staus <= 500
  ) {
    return Promise.reject(error);
  } else {
    toast.error("Unexpected error");
    return Promise.reject(error);
  }
});

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};
