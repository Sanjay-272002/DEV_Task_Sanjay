import React from 'react'
import Base from '../core/Base'
import { isAuthenticated } from "../auth/helper";
const UserDashboard=()=> {
  let userId = isAuthenticated && isAuthenticated().user.name;
  userId=userId.toUpperCase()
  return (
    <Base title="User Dashboard" description=''>
        <h4 className=' text-warning text-center display-4'>Welcome {userId}.Book your Tickets </h4>
    </Base>
  )
}
 export default UserDashboard