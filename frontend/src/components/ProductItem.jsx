import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import {Link} from 'react-router-dom'

function ProductItem({_id,image,name,price,description}) {
    const {currency} = useContext(ShopContext)
    
  return (
    <Link className='text-gray-700 cursor-pointer' to={`/product/${_id}`}>
        <div className='overflow-hidden'>
            <img className='hover:scale-110 transition ease-in-out' src={image[0]} alt="" />
        </div>
        <p className='pt3 pb-1 text-sm'>{name}</p>
        <p className='pt3 pb-1 text-sm'>{description}</p>
        <p className='text-sm font-medium'>{currency}{price}</p>
    </Link>
  )
}

export default ProductItem