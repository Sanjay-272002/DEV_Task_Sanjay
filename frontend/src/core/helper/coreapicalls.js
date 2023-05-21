import { API } from "../../backend";
//import Cookies from 'js-cookie';
export const getProducts = ()=>{
    return fetch (`${API}order/listflight/`,{
        'method':"GET",
    })
    .then((response)=>{
        console.log("success")
        console.log(response)
     return response.json();


    }).catch((err)=>{
    console.log("error",err);
    })

}