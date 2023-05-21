import React from 'react'

export default function ImageHelper({product}) {
  console.log("images",product.image)
    const imageurl=product.image ? product.image:`https://www.pexels.com/search/photoshop/`
  return (
    <div className='rounded border-success px-2'>
 <img src={' http://localhost:8000'+imageurl}
 style={{maxHeight:"100%",maxWidth:"100%"}}
 className='mb-3 rounded'
 alt=""/>    </div>
  )
}
