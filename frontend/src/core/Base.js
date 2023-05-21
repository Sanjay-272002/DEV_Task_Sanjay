import React from 'react'
import Menu from './Menu'
export default function Base({title="My Title",
description="My description",
className="text-white p-4",
children}) {
  return (
   
    <div>
       <Menu/>
     <div className='container-fluid'>
        <div className='jumbotron  text-info text-center'>
            <h1 >{title}</h1>
            <p className='lead'>{description}</p>
        </div>
        <div className={className}>{children}</div>

     </div>
     <footer className='footer bg-info mt-auto py-3'>
        <div className='container-fluid bg-info text-white text-center py-3 '>
            <h4>If you have any queries reach us out</h4>
            <button className='btn btn-warning btn-lg'>
                Contact us
            </button>
        </div>
     </footer>
    </div>
  )
}
