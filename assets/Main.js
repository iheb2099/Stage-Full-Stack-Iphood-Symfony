import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProjectList from "./pages/ProjectList"
import ProjectCreate from "./pages/ProjectCreate"
import ProjectEdit from "./pages/ProjectEdit"
import ProjectShow from "./pages/ProjectShow"
import Interface from './interface/interface';
import OrderList from './pages/Orders/OrderList';
   
function Main() {
    return (
        <Router>
            <Routes>
                <Route exact path="/"  element={<ProjectList/>} />
                <Route path='/order' element={<OrderList/>}/>

                <Route path="/create"  element={<ProjectCreate/>} />
                <Route path="/edit/:id"  element={<ProjectEdit/>} />
                <Route path="/show/:id"  element={<ProjectShow/>} />
                <Route path='/interface/*' element={<Interface/>}/>

            </Routes>
        </Router>
    );
}
   
export default Main;
   
if (document.getElementById('app')) {
    ReactDOM.render(<Main />, document.getElementById('app'));
}