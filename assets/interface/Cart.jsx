import { useState, useEffect } from 'react'
import './Cart.css'
import axios from 'axios'
import React from 'react'
const handleSave = (total,time,date,cart) => {
  let formData = new FormData()
  formData.append("total", total)
  formData.append("time", time)
  formData.append("date", date)
  formData.append("cart", cart)
  axios.post('/api/order', formData)
  
}


 function Cart({ cart, updateCart }) {
  const [isOpen, setIsOpen] = useState(true)
  const total = cart.reduce(
    (acc, foodType) => acc + foodType.amount * foodType.price,
    0
  )
  const  manageCart= async (total,date,time,order)=>{
    await handleSave(total,date,time,order);
    updateCart([]);
  }

  useEffect(() => {
    document.title = `Iphood: ${total}€ in purchases`
  }, [total])

  return isOpen ? (
    <div className='iphood-cart'>
      <button
        className='iphood-cart-toggle-button'
        onClick={() => setIsOpen(false)}
      >
        Close
      </button>
      {cart.length > 0 ? (
        <div>
          <h2>Cart</h2>
          <ul>
            {cart.map(({ name, price, amount }, index) => (
              <div key={`${name}-${index}`}>
                {name} {price}€ x {amount}
              </div>
            ))}
          </ul>
          <h3>Total :{total}€</h3>
         <div className='cart-buttons'>
          <button className='button-28' onClick={() => updateCart([])}>Clear Basket</button>
          <button className='button-28' onClick={()=>manageCart(total,new Date().toISOString().split('T')[0],new Date().toISOString().split('T')[1],JSON.stringify(cart))}>Confirm Order</button>
          </div> 
        </div>
      ) : (
        <div>Your basket is empty.</div>
      )}
    </div>
  ) : (
    <div className='iphood-cart-closed'>
      <button
        className='iphood-cart-toggle-button'
        onClick={() => setIsOpen(true)}
      >
Open cart      </button>
    </div>
  )
}

export default Cart
