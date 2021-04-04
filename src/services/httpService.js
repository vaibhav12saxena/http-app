import axios from "axios";
import { toast } from "react-toastify";
import logger from "./logService";
axios.interceptors.response.use(null, (error) => {
  if (
    error.response &&
    error.response.staus >= 400 &&
    error.response.staus <= 500
  ) {
    return Promise.reject(error);
  } else {
    logger.log(error);
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
