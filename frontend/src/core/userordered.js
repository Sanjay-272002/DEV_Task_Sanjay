import React,{useState,useEffect} from 'react';
import { getOrders, getProducts, getUserOrders } from './helper/coreapicalls';
import Base from './Base';
import "../styles.css"
import Card from './Card';
import OrderCard from './ordercard';

export default function UserOrderedflights() {
   const [orders,setorders]=useState([])
   const [error,setError]=useState(false)
   const[success,setSuccess]=useState(false)
  const loadAllProducts = ()=>{
    getUserOrders().then(data=>{
      console.log({data});
      if(data.error){
        console.log("1")
        setError(data.error)
      }else{
        console.log("0")
        setorders(data.data);
        console.log(orders)
      }
    })
  }
  const successMessage =()=>{
    return(
      <div className="row">
      <div className="col-md-6 offset-sm-3 text-left">
          <div className=" alert alert-success"
          style={{display:success?"":"none"}}>
              Flight order is deleted.
    
          </div>
      </div>
  </div>
    )
}
const cancelOrder=(id)=>{
  setorders(prev=>
    prev.filter(order=>
   order.id!==id
    ),
    setSuccess(true)
  )
}
  useEffect(()=>{
    loadAllProducts();
  },[]);
  return (
    <Base title='Sky Reach' description='Your Bookings'>
       {successMessage()}
        <div className='row'>
          {orders.map((product,index)=>{
            return(
              <div key={index} className='col-4 mb-4'>
                   <OrderCard product={product} cancelOrder={cancelOrder}/>
              </div>
            )
          })}
        </div>
    </Base>
  )
}
