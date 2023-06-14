import React, { useState } from 'react';
import ImageHelper from './helper/imageHelper';
import {Redirect} from "react-router-dom"
import { addItemToCart ,removeItemFromCart} from './helper/cartHelper';
import { isAuthenticated } from '../auth/helper';
import {  removebyadmin } from './helper/coreapicalls';
import {Link} from "react-router-dom"
const Card = ({product,addtoCart=true,
removeFromCart=false,
removeflight=false,
reload=undefined,
cancelOrder=f=>f,
setReload = f=>f, 
}) => {
    const [redirect,setRedirect]=useState(false)
    const [signinredirect,setsigninRedirect]=useState(false)
    const [adminpageredirect,setadminpageredirect]=useState(false)
    const [Alert, setAlert] = useState(false)
    const cartTitle=product?product.flight_name:"A photo from pexel"
    const flight_no =product ? product.flight_no :"222"
    const cartPrice=product ? product.ticket_price :"222"
    const ava_seats = product ?product.ava_seats : "60"
    const dep_place = product ?product.dep_place : "kanchipuram"
    const dep_time = product ?product.dep_time : "6:00"
    const des_place = product ?product.des_place : "chennai"
    const des_time = product ?product.des_time : "8:00"
    const travel_type = product ?product.travel_type : "non-stop"
    const allowed_wght = product ?product.allowed_wght : "22kg"
    const date = product ?product.date : "2023-10-2"
    const cancel_fee = product ?product.cancel_fee : "2000"
    console.log(redirect)
    const addToCart=()=>{
        if(isAuthenticated() && product.ava_seats>1){
          addItemToCart(product,()=>setRedirect(false))
          
          console.log("Add To Cart")
        }
        else if(!isAuthenticated()){
          setsigninRedirect(true)
        }else{
          setAlert(true);
        }
    }
const removeitemadmin = (id)=>{
  console.log(id)
     removebyadmin(id).then(data=>{
      console.log({data});
      if(data.error){
        console.log("1")
      }else{
        console.log("0")
        cancelOrder(id)
      }
    })
  }
    const getRedirect= redirect =>{
        if(redirect){
            return <Redirect to="/cart"/>
        }
    }
    const getadminRedirect= adminredirect =>{
      if(adminredirect){
          return <Redirect to="/admin"/>
      }
  }
    const getsigninredirect= signinredirect =>{
      if(signinredirect){
          return <Redirect to="/signin"/>
      }
  }
    const showAddToCart = addToCart=>{
        return(
        <>
            { addtoCart  && isAuthenticated() &&  (
              //   <button
              //   onClick={addToCart}
              //   className="btn btn-block btn-outline-warning mt-2 mb-2 text-white"
              // >
              //   Book a Ticket
              // </button>
              <Link to={`/seats/${product.id}`}  onClick={addToCart} className="btn btn-block btn-outline-warning mt-2 mb-2 text-white">
          Book a Ticket
        </Link>
            )}

          {addtoCart   && !isAuthenticated() &&  (
                <button
                onClick={addToCart}
                className="btn btn-block btn-outline-warning mt-2 mb-2 text-white"
              >
                Book a Ticket
              </button>
            
            )}
            </>
      
        )
    };
    const showRemoveFlight = removeflight=>{
      return(
          removeflight   &&(
              <button
              onClick={()=>{removeitemadmin(product.id)
                setReload(redirect)}}
              className="btn btn-block btn-outline-warning mt-2 mb-2 text-white"
            >
              Remove Flight
            </button>
          )
      )
  };
    const showRemoveFromCart = removeFromCart=>{
        return(
            removeFromCart &&(
                <button
                onClick={()=>{
                  removeItemFromCart(product._id)
                  setReload(!redirect)
                }}
                className="btn btn-block btn-outline-danger text-white mt-2 mb-2"
              >
                Cancel Request
              </button>
            )
        )
    }
    return (
      <>
      <div className="card text-white bg-info border border-info ">
        <div className="card-header lead">{cartTitle}</div>
        <div className="card-body">
          {getRedirect(redirect)}
         {getsigninredirect(signinredirect)}
         {getadminRedirect(adminpageredirect)}
          
         <ImageHelper product={product}/>
          <p className="lead  font-weight-normal text-wrap">
            {flight_no}
          </p>
          <p className="btn btn-warning rounded  btn-sm px-4">${cartPrice}</p>
          <p className="btn btn-warning rounded  btn-sm mx-1 px-3">Seats: {ava_seats}</p>
          <p className="btn btn-warning rounded  btn-sm mx-1 px-3">{travel_type}</p>
          <p className="btn btn-warning rounded  btn-sm mx-1 px-3">{allowed_wght}kg</p>
          <p className="btn btn-warning rounded  btn-sm mx-1 px-3">Date: {date}</p>
          <p className="btn btn-warning rounded  btn-sm mx-1 px-3">From: {dep_place} to {des_place}</p>
          <p className="btn btn-warning rounded  btn-sm mx-1 px-3">From: {dep_time} to {des_time}</p>
          <div className="row">
            <div className="col-12">
              {showAddToCart(addToCart)}
            </div>
            <div className="col-12">
              {showRemoveFromCart(removeFromCart)}
            </div>
            <div className="col-12">
              {showRemoveFlight(removeflight)}
            </div>
          </div>
        </div>
      </div>
      {
        Alert ? (
          <div className='alert alert-danger'>
            Seats unavailable
          </div>
        ):null
      }
  
      </>
    );
  };

  export default Card