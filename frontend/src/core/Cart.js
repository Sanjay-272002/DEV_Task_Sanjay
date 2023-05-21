import React, { useEffect, useState } from 'react'
import Base from './Base'
import Card from './Card'
import { loadCart } from './helper/cartHelper'
import PaymentB from './PaymentB'
const Cart=()=> {
    const [reload,setReload]=useState(false)
    const [products,setProducts] = useState([])
    useEffect(()=>{
        setProducts(loadCart())
    },[reload])

    const loadAllProducts=(products)=>{
        return(
            <div>
                <h1>Cart</h1>
                {products.map((product,index)=>(
                   <Card 
                   key={index}
                   product={product}
                   removeFromCart={true}
                   addtoCart={false}
                   reload={reload}
                   setReload={setReload}
                   />
                ))}
            </div>
        )
    }
    const loadCheckout=()=>{
        return(
            <div>
                <h1>Checkout</h1>
            </div>
        )
    }

  return (
    <Base title='Booking page' description='Your added Bookings'>
        <div className='row text-center '>
            <div className='col-6 text-info'>
                {products.length>0?(loadAllProducts(products)):(
                    <h4>No Bookings</h4>
                )}
            </div>
            <div className="col-6 text-info">
          {products.length > 0
            ? (
              <PaymentB products={products} setReload={setReload} />
            )
            : (
              <h3>Please login or add something in Booking </h3>
            )}
        </div>
        </div>
</Base>
  )
}

export default Cart
