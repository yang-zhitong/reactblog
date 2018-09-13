import iaxios from 'axios';
import createHistory from 'history/createBrowserHistory';


// 带上 cookie
// axios.defaults.withCredentials = true;
const instance = iaxios.create({
  baseURL: process.env.NODE_ENV === 'production' ? `http://${window.location.hostname}` : 'http://localhost:9000',
  timeout: 1000,
  withCredentials: true, // 带上 cookie
});

instance.interceptors.request.use(
  config => { 
    // console.log(config)
    return config;
  },
  error => Promise.reject(error),
);

// // 相应拦截器
instance.interceptors.response.use(
  res => (res.data),
  error => Promise.reject(error),
);


export const axios = instance;

export const history = createHistory();
