import React, { useState } from 'react';
import ImageHelper from './helper/imageHelper';
import {Redirect} from "react-router-dom"
import { addItemToCart ,removeItemFromCart} from './helper/cartHelper';
import { isAuthenticated } from '../auth/helper';
import {  removebyadmin,removeorderadmin } from './helper/coreapicalls';

const OrderCard = ({product,
removeflight=true,
reload=undefined,
cancelOrder=f=>f,
setReload = f=>f, 
}) => {
    const [redirect,setRedirect]=useState(false)
    const [Alert, setAlert] = useState(false)
   
    const flight_name=product?product.flight_name:"tata"
    const flight_no =product ? product.flight_no :"222"
    const user_name=product? product.user_name:"sanjay"
    const dep_place=product?product.dep_place:"che"
    const dep_time=product?product.dep_time:"00:00"
    const des_place = product?product.des_place:"delhi"
    const des_time = product?product.des_time:"00:00"
    const total_tickets=product?product.total_tickets:"0"
    const seats = product ? product.seats : [];
    console.log("seats",seats)
    const seatNumbers = seats.map(({ seat_no }) => seat_no);
    console.log(redirect)
const removeitemadmin = (id)=>{
  console.log("id",id)
  removeorderadmin(id).then(data=>{
        
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
    
    const showRemoveFlight = removeflight=>{
      return(
          removeflight   &&(
              <button
              onClick={()=>{removeitemadmin(product.id)
                }}
              className="btn btn-block btn-outline-warning mt-2 mb-2 text-white"
            >
              Remove Order
            </button>
          )
      )
  };
  
    return (
      <>
      <div className="card text-white bg-info border border-info ">
        <div className="card-header lead">{flight_name}</div>
        <div className="card-body">
          {getRedirect(redirect)}
          <p className="lead  font-weight-normal text-wrap">
           Flight No: {flight_no}
          </p>
          <p className="lead  font-weight-normal text-wrap">
          Total Tickets:{total_tickets}
          </p>
          <p className="lead  font-weight-normal text-wrap">
          Booked seats:{seatNumbers}
          </p>
          <p className="lead  font-weight-normal text-wrap">Booked By: {user_name}</p>
          <p className="btn btn-warning rounded  btn-sm mx-1 px-3">From: {dep_place} to {des_place}</p>
          <p className="btn btn-warning rounded  btn-sm mx-1 px-3">From: {dep_time} to {des_time}</p>
          <div className="row">
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

  export default OrderCard