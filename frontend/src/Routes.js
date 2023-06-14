import React from "react";
import {BrowserRouter,Switch,Route} from "react-router-dom";
import Home from "./core/Home"
import PrivateRoutes from "./auth/helper/PrivateRoutes";
import Signup from "./user/signup";
import UserDashboard from "./user/UserDashboard";
import Signin from "./user/Signin";
import Cart from "./core/Cart";
import AdminHome from "./core/adminhome";
import AddFlight from "./core/addFlight";
import Orderedflights from "./core/orderedFlights";
import UserOrderedflights from "./core/userordered";
import Profile from "./core/profile";
import Seats from "./core/seat";
import search from "./core/search";
const Routes =()=>{
    return(
        <BrowserRouter>
        <Switch>
            <Route path="/" exact component={Home}/>
            <Route path="/signup" exact component={Signup}/>
            <Route path="/signin" exact component={Signin}/>
            <Route path="/cart" exact component={Cart}/>
            <Route path="/admin" exact component={AdminHome}/>
            <Route path="/addflight" exact component={AddFlight}/>
            <Route path="/removeorder" exact component={Orderedflights}/>
            <Route path="/userorders" exact component={UserOrderedflights}/>
            <Route path="/profile" exact component={Profile}/>
            <Route path="/seats/:id" exact component={Seats}/>
            <Route path="/search" exact component={search}/>
            <PrivateRoutes path="/user/dashboard"exact component={UserDashboard}/>
        </Switch>
        </BrowserRouter>
    )
}

export default Routes; 