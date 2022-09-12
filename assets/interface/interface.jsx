import { useState, useEffect } from 'react'
import React from 'react';
import Navbar from './navbar';
import Footer from './footer';
import  {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import ShoppingList from './shoppingList';
import Cart from './Cart';

function Interface() {
  const savedCart = localStorage.getItem('cart')
  const [cart, updateCart] = useState(savedCart ? JSON.parse(savedCart) : [])
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])
  return (

    <>
    {/* <Swipe/> */}
        {/* <Cart cart={cart} updateCart={updateCart} />
        <ShoppingList cart={cart} updateCart={updateCart} /> */}
     
      <Navbar/>
      <Routes>
      <Route path='/' element={<ShoppingList cart={cart} updateCart={updateCart} />}/>

      <Route path='/pizza' element={<ShoppingList activeCategory='pizza' cart={cart} updateCart={updateCart}/>}/>
      <Route path='/coke' element={<ShoppingList activeCategory='coke' cart={cart} updateCart={updateCart}/>}/>
      <Route path='/salad' element={<ShoppingList activeCategory='salad' cart={cart} updateCart={updateCart}/>}/>
      <Route path='/burger' element={<ShoppingList activeCategory='burger' cart={cart} updateCart={updateCart}/>}/>
      <Route path='/spaghetti' element={<ShoppingList activeCategory='spaghetti' cart={cart} updateCart={updateCart}/>}/>

      </Routes>
      <Cart cart={cart} updateCart={updateCart} /> 

      <Footer/>
    </>
  );
}

export default Interface;
