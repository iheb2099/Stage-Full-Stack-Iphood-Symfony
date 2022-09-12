import { useState,useEffect } from 'react'
import './shoppingList.css'
import './foodItem.css'
import offerBurger from './assets/offerBurger.jpg'
import offerPizza from './assets/offerPizza.jpg'
import offerchicken from './assets/offerchicken.jpg'
import Popup from 'reactjs-popup';
import Counter from './Counter'
import Carousel from 'nuka-carousel'
import axios from 'axios'
import React from 'react'

function ShoppingList({activeCategory='all',cart,updateCart}) {
  const  [food, setProjectList] = useState([])
  
  useEffect(() => {
      fetchProjectList()
  }, [])

  const fetchProjectList = () => {
      axios.get('http://localhost:8000/api/project')
      .then(function (response) {
        setProjectList(response.data);
      })
      .catch(function (error) {
        console.log(error);
      })
  }
  const [amount,setAmount]=useState(0)
  const[open,isOpen]=useState(false)
  function addToCart(name, price,amount) {
    
      const cartFilteredCurrentFood = cart.filter(food => food.name !== name)
      
      updateCart([
        ...cartFilteredCurrentFood,
        { name, price, amount: amount }
      ])
  
  }
  console.log(food)
  console.log(activeCategory)
  if (activeCategory==='all' && food.length>0)
 {   return (


      <div>
        <Carousel animation='fade' autoplay={true} cellAlign='center' wrapAround={true} dragThreshold={0.2} adaptiveHeight={false} >
          <img src={offerBurger} width='100%' height='100%'/>
          <img src={offerPizza} width='100%' height='100%'/>
          <img src={offerchicken} width='100%' height='100%'/>

        </Carousel>
       
        <ul className='iphood-food-list'>
          { food.map(({ id, cover, name, price,ingredients }) =>
            
              <div key={id}>
                <li className='iphood-food-item'>
                <span className='iphood-food-item-price'>{price}€</span>
                <img className='iphood-food-item-cover' src={`/build/images/${cover}`} alt={`${name} cover`} />
                {name}
              </li>
              <Counter setAmount={setAmount}/>
              <Popup trigger={<button  className='button-27' >Add</button>
} modal nested>
      {close => (
 
         <div className='ingredients-form' >
  
        <h2> Choose your ingredients </h2>
        {Object.entries(JSON.parse(ingredients)).map(([key,value])=><div>{value==='optional' &&
         <fieldset>
    <legend>Do you want to include {key}:</legend>
    <div className='options'>
    <div className>
      <input type="radio" id={key} name={key} value={value}
             checked/>
      <label for={key}>Yes</label>
    </div> 

    <div>
      <input type="radio" id={key} name={key} value={value}/>
      <label for={key}>No</label>
    </div>
    </div>
    <label for={key}>if yes how much : </label>
    <select name={key}>
      <option value='Large'>Large</option>
      <option value='Medium' >Medium</option>
      <option value='Little'>Little</option>
    </select>
    
</fieldset>
 }</div>)} 
          <button className='button-27'  onClick={() =>{amount!==0? addToCart(name, price,amount):isOpen(false);close()}}>Submit</button>
           
          </div>
      )}

            </Popup>
              </div>
            ) 
          }
        </ul>
        </div>
     
    )
  }

 if (activeCategory!=='all' && food.length>0){

  return (

    <div>
      <ul className='iphood-food-list'>
        {food.map(({ id, cover, name, price,category,ingredients }) =>
           activeCategory===category?(
            <div key={id}>
              <li className='iphood-food-item'>
                <span className='iphood-food-item-price'>{price}€</span>
                <img className='iphood-food-item-cover' src={`/build/images/${cover}`} alt={`${name} cover`} />

		        	<div>{name}</div>
            </li>
            <Counter setAmount={setAmount}/>
            <Popup trigger={<button  className='button-27' >Add</button>
} modal nested>
      {close => (
 
         <div className='ingredients-form' >
  
        <h2> Choose your ingredients </h2>
        {Object.entries(ingredients).map(([key,value])=><div>{value==='optional' && <fieldset>
    <legend>Do you want to include {key}:</legend>
    <div className='options'>
    <div >
      <input type="radio" id={key} name={key} value={value}
             checked/>
      <label for={key}>Yes</label>
    </div> 

    <div>
      <input type="radio" id={key} name={key} value={value}/>
      <label for={key}>No</label>
    </div>
    </div>
    <label for={key}>if yes how much : </label>
    <select name={key}>
      <option value='Large'>Large</option>
      <option value='Medium' >Medium</option>
      <option value='Little'>Little</option>
    </select>
    
</fieldset>
 }</div>)} 
          <button className='button-27'  onClick={() =>amount!==0? addToCart(name, price,amount):isOpen(false)}>Submit</button>
           
          </div>
      )}

            </Popup>
            </div>
            
          ) :null
        )}
      </ul>
      </div>
   
  ) }
}

export default ShoppingList
