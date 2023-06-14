import { isAuthenticated } from "../../auth/helper";
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
export const getOrders = ()=>{
  return fetch (`${API}order/listbooks/`,{
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
export const getUserOrders = ()=>{
  const userId = isAuthenticated().user.id; // Get the user ID
  const queryParams = new URLSearchParams(); // Create URLSearchParams object
  queryParams.append('user_id', userId); // Create URLSearchParams object and set the 'id' parameter
    
  return fetch(`${API}order/listbooks/?${queryParams.toString()}`, {
    method: "GET",
  })
  .then((response)=>{
      console.log("success")
      console.log(response)
   return response.json();
  }).catch((err)=>{
  console.log("error",err);
  })

}
export const getSeats = (id)=>{

  const queryParams = new URLSearchParams(); // Create URLSearchParams object
  queryParams.append('id',id); // Create URLSearchParams object and set the 'id' parameter
    
  return fetch(`${API}order/listseats/?${queryParams.toString()}`, {
    method: "GET",
  })
  .then((response)=>{
      console.log("success")
   return response.json();
  }).catch((err)=>{
  console.log("error",err);
  })
}

export const removebyadmin = (id) => {
    const params = new URLSearchParams({ id }); // Create URLSearchParams object and set the 'id' parameter
    
    return fetch(`${API}order/postflight/?${params.toString()}`, {
      method: "DELETE",
    })
      .then((response) => {
        console.log("success");
        console.log(response);
        return response.json();
      })
      .catch((err) => {
        console.log("error", err);
      });
  };

  export const removeorderadmin = (id) => {
    const params = new URLSearchParams({ id }); // Create URLSearchParams object and set the 'id' parameter
    return fetch(`${API}order/listbooks/?${params.toString()}`, {
      method: "DELETE",
    })
      .then((response) => {
        console.log("success");
        console.log(response);
        return response.json();
      })
      .catch((err) => {
        console.log("error", err);
      });
  };

  export const adminaddflight = (formData)=>{
    return fetch(`${API}order/postflight/`,{
        method:"POST",
        headers:{
            Accept:"application/json",
            // "Content-Type":"application/json"
        },
        body:formData
    })
    .then(response =>{
        return response.json();
    })
    .catch(err=>
        console.log(err))
}