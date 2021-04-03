import axios from "axios";

axios.interceptors.response.use(null, (error) => {
  if (
    error.response &&
    error.response.staus >= 400 &&
    error.response.staus <= 500
  ) {
    return Promise.reject(error);
  } else {
    alert("Unexpected error");
    return Promise.reject(error);
  }
});

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};
