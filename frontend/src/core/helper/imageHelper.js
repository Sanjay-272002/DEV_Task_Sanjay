import React from 'react'

export default function ImageHelper({product}) {
    const imageurl=product ? product.image:`https://www.pexels.com/search/photoshop/`
  return (
    <div className='rounded border-success px-2'>
 <img src={imageurl}
 style={{maxHeight:"100%",maxWidth:"100%"}}
 className='mb-3 rounded'
 alt=""/>    </div>
  )
}
