import React,{useState,useEffect} from 'react';
import { getProducts } from './helper/coreapicalls';
import Base from './Base';
import "../styles.css"
import Card from './Card';

export default function Home() {
   const [products,setProducts]=useState([])
   const [error,setError]=useState(false)
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
  useEffect(()=>{
    loadAllProducts();
  },[]);
  return (
    <Base title='Sky Reach' description='Book Your Tickets'>
        <div className='row'>
          {products.map((product,index)=>{
            return(
              <div key={index} className='col-4 mb-4'>
                   <Card product={product}/>
              </div>
            )
          })}
        </div>
    </Base>
  )
}
