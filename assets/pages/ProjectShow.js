import React, {useState, useEffect} from 'react';
import { Link, useParams } from "react-router-dom";
import Layout from "../components/Layout"
import axios from 'axios';
  
function ProjectShow() {
    const [id, setId] = useState(useParams().id)
    const [project, setProject] = useState({name:'', category:'',price:1,ingredients:'',cover:''})
    useEffect(() => {
        axios.get(`/api/project/${id}`)
        .then(function (response) {
          setProject(response.data)
        })
        .catch(function (error) {
          console.log(error);
        })
    }, [])
  
    return (
        <Layout>
           <div className="container">
            <h2 className="text-center mt-5 mb-3">Show Food</h2>
                <div className="card">
                    <div className="card-header">
                        <Link 
                            className="btn btn-outline-info float-right"
                            to="/"> View your menu
                        </Link>
                    </div>
                    <div className="card-body">
                        <b className="text-muted">Name:</b>
                        <p>{project.name}</p>
                        <b className="text-muted">Category:</b>
                        <p>{project.category}</p>
                        <b className="text-muted">Price:</b>
                        <p>{project.price}</p>
                        <b className="text-muted">Ingredients:</b>
                        <p>{project.ingredients}</p>
                        <b className="text-muted">Cover:</b>
                        <p>{project.cover}</p>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
  
export default ProjectShow;