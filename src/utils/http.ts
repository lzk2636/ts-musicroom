import  axios from 'axios'
import store from '../store/index'
const instance = axios.create({
  baseURL: process.env.VUE_APP_BASEURL,
  timeout: 1000,
  // headers: {'X-Custom-Header': 'foobar'}
});
// Add a request interceptor
instance.interceptors.request.use(function (config) {
  let token=store.state.userInfo.token
  if(token){
    config.headers.Authorization =token
  }else{
    token=localStorage.getItem("my_token")||""
    if(token==""){
      return config;
    }
    config.headers.Authorization =token

  }
  console.log(config)
  // Do something before request is sent
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

// Add a response interceptor
instance.interceptors.response.use(function (response) {
  // Do something with response data
  return response;
}, function (error) {
  // Do something with response error
  return Promise.reject(error);
});
export default instance