import React from 'react';
import { useEffect,useState } from 'react';
import {Link} from 'react-router-dom'
import { Button } from './Button';
import  './navbar.css'
function Navbar() {
    const [click,setClick] = useState(false);
    const [button,setButton]=useState(true)
    const handleClick=()=> setClick(!click)
    const closeMobileMenu=()=> setClick(false);
    const showButton=()=>{
        if(window.innerWidth <= 960){
            setButton(false)
        }
        else {
            setButton(true)
        }
    };
    useEffect(()=>{
        showButton()
    },[]);
        
    
  
    window.addEventListener('resize',showButton);
  return (
    <>
    <nav className='navbar'>
    <div className='navbar-container'>
       <Link to="/interface" className="navbar-logo" onClick={closeMobileMenu} >
        IPhood <i className='fab fa-typo3'/>
        </Link> 
    </div>
    <div className='menu-icon'onClick={handleClick}>
        <i className={click ? 'fas fa-times':'fas fa-bars'} />
    </div>
    <ul className={click ? 'nav-menu active':'nav-menu'}>
        <li className='nav-item'>
            <Link to='/interface' className='nav-links' onClick={closeMobileMenu}>
            <i className="fa-solid fa-bowl-food"/> ALL
            </Link>
        </li>
        <li className='nav-item'>
            <Link to='/interface/salad' className='nav-links' onClick={closeMobileMenu}>
            <i className="fa-solid fa-plate-wheat"></i> Salade 
            </Link>
            
        </li>
        <li className='nav-item'>
            <Link to='/interface/pizza' className='nav-links' onClick={closeMobileMenu}>
            <i className="fa-solid fa-pizza-slice"></i> Pizza
            </Link>
            
        </li>
        <li className='nav-item'>
            <Link to='/interface/coke' className='nav-links' onClick={closeMobileMenu}>
            <i className="fa-solid fa-wine-bottle"></i>Boisson
            </Link>
            
        </li>
        <li className='nav-item'>
            <Link to='/interface/spaghetti' className='nav-links' onClick={closeMobileMenu}>
            <i className="fa-solid fa-stroopwafel"></i> Spaghetti
            </Link>
            
        </li>
        <li className='nav-item'>
            <Link to='/interface/burger' className='nav-links' onClick={closeMobileMenu}>
            <i className="fa-solid fa-burger"></i>  Burger 
            </Link>
            
        </li>
    </ul>

    </nav>
        </>
  )
}

export default Navbar