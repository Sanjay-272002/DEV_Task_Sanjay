import React from 'react'
import Base from '../core/Base'
import { isAuthenticated } from "../auth/helper";
const UserDashboard=()=> {
  let userId = isAuthenticated && isAuthenticated().user.name;
  let usertype=isAuthenticated && isAuthenticated().user.user_type;
  userId=userId.toUpperCase()
  return (
    <Base title="User Dashboard" description=''>
        <h4 className=' text-warning text-center display-6'>Welcome {usertype} {userId} to our SkyReach. </h4>
        <hr></hr>
        <hr></hr>
        <hr></hr>
        <hr></hr>
        <hr></hr>
        <hr></hr>
        <hr></hr>
    </Base>
  )
}
 export default UserDashboard