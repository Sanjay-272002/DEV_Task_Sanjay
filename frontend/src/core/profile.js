import React from 'react'
import Base from '../core/Base'
import { isAuthenticated } from "../auth/helper";


const Profile = () => {
    let userId = isAuthenticated && isAuthenticated().user.name;
    let usertype=isAuthenticated && isAuthenticated().user.user_type;
    let email=isAuthenticated && isAuthenticated().user.email;
    let phone=isAuthenticated && isAuthenticated().user.phone;
    let gender=isAuthenticated && isAuthenticated().user.gender;
   
    userId=userId.toUpperCase()
    return (
        <Base title="Profile" description=''>
            <div className='profile'> 
        <div class="col-md-3 col-xs-6 bg-info">
          <div class="details-left box1">
          
            <ul>
              <li>Name </li>
              <li>Email </li>
              <li>User_type</li>
              <li>Phone</li>
              <li>Gender</li>
            </ul>
          </div>
        </div>

         <div class="col-md-3 col-xs-6 bg-info  box2">
           <div className="detail-right">
             <ul>
               <li>{userId }</li>
               <li>{usertype}</li>
               <li>{email}</li>
               <li>{phone}</li>
               <li>{gender}</li>
             </ul>
           </div>
         </div>   
         </div>
        </Base>
    )
}

export default Profile