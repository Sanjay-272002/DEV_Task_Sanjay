import React, { useEffect, useState } from 'react';
import { getSeats } from './helper/coreapicalls';
import Base from './Base';
import "../styles.css";
import { useParams, useHistory } from 'react-router-dom';
const Seats = () => {
  const { id } = useParams();
  const [availableSeats, setAvailableSeats] = useState([]);
  const [error,setError]=useState(false)
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedSeatsname, setSelectedSeatsname] = useState([]);
  const [numSeatsRequired, setNumSeatsRequired] = useState(0);
  const[emptyalert,setEmptyAlert]=useState(false)
  const[bookedalert,setBookedAlert]=useState(false)
  const history = useHistory();
  console.log("id",id)
  const loadAllseats = ()=>{
    getSeats(id).then(data=>{
      console.log({data});
      if(data.error){
        console.log("1")
        setError(data.error)
      }else{
        console.log("0")
        setAvailableSeats(data.data);
        console.log(availableSeats)
      }
    })
  }

  useEffect(()=>{
    loadAllseats();
  },[]);
  // const handleSeatSelect = (seatId,seat_no,is_booked) => {
  //   const isSelected = selectedSeats.includes(seatId);
  //   let updatedSelectedSeats;
  //   let SelectedSeatsname;
  //    if (isSelected) {
  //     updatedSelectedSeats = selectedSeats.filter(id => id !== seatId);
  //   } else {
  //     if (selectedSeats.length < numSeatsRequired && !is_booked) {
  //       updatedSelectedSeats = [...selectedSeats, seatId];
  //       SelectedSeatsname=[...selectedSeatsname,seat_no];
  //       setSelectedSeatsname(SelectedSeatsname)
  //     } else {
  //       return updatedSelectedSeats ; // Do not allow selection if the required number of seats is reached
  //     }
  //   }
    
  //   setSelectedSeats(updatedSelectedSeats);
  // };
  const handleSeatSelect = (seatId,seat_no,is_booked) => {
    const isSelected = selectedSeats.includes(seatId);
    let updatedSelectedSeats;
    let updatedSelectedSeatsname;
    if (is_booked) {
      // Seat is already booked, show error message or perform any desired action
      console.log("Seat is already booked");
      setBookedAlert(true)
      return;
    }

    if (isSelected) {
      console.log("True")
      updatedSelectedSeats = selectedSeats.filter(id => id !== seatId);
      updatedSelectedSeatsname = selectedSeatsname.filter(name => name !== seat_no);
      setSelectedSeatsname(updatedSelectedSeatsname);
      console.log("seats",updatedSelectedSeats)
    } else {
      if (selectedSeats.length < numSeatsRequired) {
        updatedSelectedSeats = [...selectedSeats, seatId];
        console.log("seats",updatedSelectedSeats)
        updatedSelectedSeatsname=[...selectedSeatsname,seat_no];
        setSelectedSeatsname(updatedSelectedSeatsname)
      } else {
        return; // Do not allow selection if the required number of seats is reached
      }
    }
    setSelectedSeats(updatedSelectedSeats);
  };

  const handleSubmit = () => {
    // Send the selected seat IDs to the API
    if(selectedSeats.length === numSeatsRequired){
    history.push(`/cart?selectedSeats=${selectedSeats.join(',')}&numSeatsRequired=${numSeatsRequired}&selectedSeatsname=${selectedSeatsname.join(',')}`);
  }else{
    setEmptyAlert(true)
  }
  };
  const alertMessage =()=>{
    return(
      <div className="row">
      <div className="col-md-6 mx-1 offset-sm-3 text-left ">
          <div className=" alert alert-danger"
          style={{display:emptyalert?"":"none"}}>
             Please select your seats
    
          </div>
      </div>
  </div>
    )
}
const BookedMessage =()=>{
  return(
    <div className="row">
    <div className="col-md-6 mx-1 offset-sm-3 text-left ">
        <div className=" alert alert-danger"
        style={{display:bookedalert?"":"none"}}>
          Seat is already booked.Pls select anyother seats.
        </div>
    </div>
</div>
  )
}

  return (
    <Base title='Sky Reach' description='Available seats'>
    <div >
      <div className='num'>
      {alertMessage()}
      {BookedMessage()}
      <label className="text-info labell" for="numm">No Of Seats Required:</label>
      <input
        type="number"
        min="1"
        id='numm'
        max={availableSeats.length}
        value={numSeatsRequired}
        onChange={e => setNumSeatsRequired(parseInt(e.target.value))}
      />
      </div>
      {/* <div className='type'>
                    <label className="text-secondary bold text-info">Seat Type</label>
                    <select
                          className="form-control"
                          // value={travel_type}
                          // onChange={handleChange("travel_type")}
                          >
                    <option value="admin">First</option>
                    <option value="user">Bussiness</option>
                    <option value="user">Economy</option>
                    </select>
      </div> */}
      <hr></hr>
      <hr></hr>
      <div className='bg-info seatbox'>
  <div className='margin container boxx'>
    {availableSeats.map((seat, index) => (
      <React.Fragment key={seat.id}>
        <div
          className={`seat ${seat.is_booked ? 'red' : (selectedSeats.includes(seat.id) ? 'selected' : 'green')}`}
          onClick={() => handleSeatSelect(seat.id, seat.seat_no, seat.is_booked)}
        >
          {seat.seat_no}
        </div>
        {(index + 1) % 6 === 0 ? <br /> : null} {/* Insert line break after every 6 seats */}
      </React.Fragment>
    ))}
  </div>
</div>
<div className='butto'>
  <button className='name' onClick={handleSubmit}>Book Seats</button>
</div>
    </div>
</Base>
  );
};

export default Seats;
