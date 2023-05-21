import { API } from "../../backend";

export const createOrder = (userId,token,orderData)=>{
    console.log(userId,token)
    const formData = new FormData();
    console.log("orderdata",orderData)
    for(const name in orderData){
        formData.append(name,orderData[name])
    }
    return fetch(`${API}order/addorder/${userId}/${token}/`,{
        method:"POST",
        body:formData
    })
    .then(res=>{
        console.log("response",res)
        return res.json()
    }).catch(err=>{
        console.log(err)
    })
}