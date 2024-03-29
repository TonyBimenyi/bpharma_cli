import axios from "axios";

let instance = axios.create({
    withCredentials:true
});
instance.interceptors.request.use(request=>{
    request.headers.common['Accept'] = 'application/json';
    request.headers.common['Content-Type']
})

export default instance;