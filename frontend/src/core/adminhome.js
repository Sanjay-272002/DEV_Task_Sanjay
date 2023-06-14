import React,{useState,useEffect} from 'react';
import { getProducts,removebyadmin } from './helper/coreapicalls';
import Base from './Base';
import "../styles.css"
import Card from './Card';

export default function AdminHome() {
   const [products,setProducts]=useState([])
   const [error,setError]=useState(false)
   const[success,setSuccess]=useState(false)
  const loadAllProducts = ()=>{
    getProducts().then(data=>{
      console.log({data});
      if(data.error){
        console.log("1")
        setError(data.error)
      }else{
        
        console.log("0")
        setProducts(data.data);
        console.log(products)
      }
    })
  }
  const cancelOrder=(id)=>{
    setProducts(prev=>
      prev.filter(order=>
     order.id!==id
      ),setSuccess(true)
    )
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
  useEffect(()=>{
    loadAllProducts();
  },[]);
  return (
    <Base title='Sky Reach' description='ADMIN PAGE'>
      {successMessage()}
        <div className='row'>
        {products.map((product,index)=>(
           <div key={index} className='col-4 mb-4'>
                   <Card 
                   key={index}
                   product={product}
                   removeFromCart={false}
                   removeflight={true}
                   addtoCart={false}
                   cancelOrder={cancelOrder}
                   />
                   </div>
                ))}
        </div>
    </Base>
  )
}
