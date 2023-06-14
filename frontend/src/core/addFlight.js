import React, { useState } from "react";
import Base from "../core/Base"
import {Link} from "react-router-dom"
import { adminaddflight } from "./helper/coreapicalls";


const AddFlight = ()=>{
    const [flights,setflights] =useState({
        flight_name:"",
        flight_no:"",
        ticket_price:"",
        ava_seats:"",
        dep_place:"",
        dep_time:"",
        des_place:"",
        des_time:"",
        travel_type:"",
        cancel_fee:"",
        allowed_wght:"",
        date:"",
        image:"" ,
        error:"",
        success:false,
    })
    const {flight_name,flight_no,ticket_price,ava_seats,dep_place,dep_time,des_place,des_time,travel_type,cancel_fee,allowed_wght,date,image,error,success}=flights
    const handleChange = (name) => (event) => {
        if (name === "image") {
            console.log(event.target.files[0])
          setflights({ ...flights, error: false, [name]: event.target.files[0] });
        } else {
          setflights({ ...flights, error: false, [name]: event.target.value });
        }
      };
    const onSubmit = (event)=>{
        event.preventDefault();
        // setflights({...flights,error:false})
        console.log("image",image)
        const formData = new FormData();

// Append the image file to the form data
      formData.append('image', image);

// Append other data to the form data
       formData.append('flight_name', flight_name);
        formData.append('flight_no', flight_no);
        formData.append('ticket_price', ticket_price);
         formData.append('ava_seats', ava_seats);
        formData.append('dep_place', dep_place);
        formData.append('dep_time', dep_time);
        formData.append('des_place', des_place);
        formData.append('des_time', des_time);
        formData.append('travel_type', travel_type);
        formData.append('cancel_fee', cancel_fee);
        formData.append('allowed_wght', allowed_wght);
        formData.append('date', date);
        adminaddflight(formData).then(data=>{
            console.log("Data",data)
            setflights({
              ...flights,
              success:true
          })
        }).catch(err=>{console.log(err)})
    }
   
    const successMessage =()=>{
        return(
          <div className="row">
          <div className="col-md-6 offset-sm-3 text-left">
              <div className=" alert alert-success"
              style={{display:success?"":"none"}}>
                  New Flight is added.
        
              </div>
          </div>
      </div>
        )
    }
    const errorMessage =()=>{
        return(
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <div className=" alert alert-danger"
                    style={{display:error?"":"none"}}>
                        Check all fields again
                    </div>
                </div>
            </div>
        )
    }
    const postForm =()=>{
        return (
            <div className="row ">
              <div className="col-md-6 offset-sm-3 text-left">
                <form>
                  <div className="form-group">
                    <label className="text-secondary">Flight Name</label>
                    <input
                      className="form-control"
                      value={flight_name}
                      onChange={handleChange("flight_name")}
                      type="text"
                    />
                  </div>
                  <div className="form-group">
                    <label className="text-secondary bold">Flight Number</label>
                    <input
                      className="form-control"
                      value={flight_no}
                      onChange={handleChange("flight_no")}
                      type="number"
                    />
                  </div>
                  <div className="form-group">
                    <label className="text-secondary bold">Ticket Price</label>
                    <input
                      className="form-control"
                      value={ticket_price}
                      onChange={handleChange("ticket_price")}
                      type="number"
                    />
                  </div>
                  <div className="form-group">
                    <label className="text-secondary bold">Available Seats</label>
                    <input
                      className="form-control"
                      value={ava_seats}
                      onChange={handleChange("ava_seats")}
                      type="number"
                    />
                  </div>
                  <div className="form-group">
                    <label className="text-secondary">Departure Place</label>
                    <input
                      className="form-control"
                      value={dep_place}
                      onChange={handleChange("dep_place")}
                      type="text"
                    />
                    </div>
                    <div className="form-group">
                    <label className="text-secondary">Departure Time</label>
                    <input
                      className="form-control"
                      value={dep_time}
                      onChange={handleChange("dep_time")}
                      type="time"
                    />
                    </div>
                    <div className="form-group">
                    <label className="text-secondary">Destination Place</label>
                    <input
                      className="form-control"
                      value={des_place}
                      onChange={handleChange("des_place")}
                      type="text"
                    />
                    </div>
                    <div className="form-group">
                    <label className="text-secondary">Destination Time</label>
                    <input
                      className="form-control"
                      value={des_time}
                      onChange={handleChange("des_time")}
                      type="time"
                    />
                    </div>
                    <div className="form-group">
                    <label className="text-secondary bold">Travel Type</label>
                    <select
                          className="form-control"
                          value={travel_type}
                          onChange={handleChange("travel_type")}
                          >
                    <option value="admin">Non-stop</option>
                    <option value="user">Stop-By</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="text-secondary bold">Cancellation Fees</label>
                    <input
                      className="form-control"
                      value={cancel_fee}
                      onChange={handleChange("cancel_fee")}
                      type="number"
                    />
                  </div>
                  <div className="form-group">
                    <label className="text-secondary bold">Allowed Weight</label>
                    <input
                      className="form-control"
                      value={allowed_wght}
                      onChange={handleChange("allowed_wght")}
                      type="number"
                    />
                  </div>
                  <div className="form-group">
                    <label className="text-secondary bold">Date</label>
                    <input
                      className="form-control"
                      value={date}
                      onChange={handleChange("date")}
                      type="date"
                    />
                  </div>

                    <div className="form-group">
                    <label className="text-secondary bold">Image</label>
                    <input
                      className="form-control"
                      onChange={handleChange("image")}
                      type="file"
                    />
                  </div>

                  <button
                    onClick={onSubmit}
                    className="btn btn-success btn-block"
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
          );
    }
    return(
        <Base title="Add Flight" description="Adding flights" >
            {successMessage()}
            {errorMessage()}
            {postForm()}
        </Base> 
          )
}

export default AddFlight;