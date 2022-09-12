import React, { useState, useEffect } from 'react';
import { Link, useParams } from "react-router-dom";
import Layout from "../components/Layout"
import Swal from 'sweetalert2'
import axios from 'axios';
  
function ProjectEdit() {
    const [id, setId] = useState(useParams().id)
    const [name, setName] = useState('');
    const [category, setCategory] = useState('')
    const [price, setPrice] = useState(1)
    const [cover, setCover] = useState('')
    const [ingredients, setIngredients] = useState('')

    const [isSaving, setIsSaving] = useState(false)
  
      
    useEffect(() => {
        axios.get(`/api/project/${id}`)
        .then(function (response) {
            let project = response.data
            setName(project.name);
            setCategory(project.category);
            setPrice(project.price)
            setCover(project.cover)
            setIngredients(project.ingredients)


        })
        .catch(function (error) {
            Swal.fire({
                icon: 'error',
                title: 'An Error Occured!',
                showConfirmButton: false,
                timer: 1500
            })
        })
          
    }, [])
  
  
    const handleSave = () => {
        setIsSaving(true);
        axios.patch(`/api/project/${id}`, {
            name: name,
            category: category,
            cover:cover,
            price:price,
            ingredients:ingredients,

        })
        .then(function (response) {
            Swal.fire({
                icon: 'success',
                title: 'Project updated successfully!',
                showConfirmButton: false,
                timer: 1500
            })
            setIsSaving(false);
        })
        .catch(function (error) {
            Swal.fire({
                icon: 'error',
                title: 'An Error Occured!',
                showConfirmButton: false,
                timer: 1500
            })
            setIsSaving(false)
        });
    }
  
  
    return (
        <Layout>
            <div className="container">
                <h2 className="text-center mt-5 mb-3">Edit Menu</h2>
                <div className="card">
                    <div className="card-header">
                        <Link 
                            className="btn btn-outline-info float-right"
                            to="/">View All Projects
                        </Link>
                    </div>
                    <div className="card-body">
                        <form>
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input 
                                    onChange={(event)=>{setName(event.target.value)}}
                                    value={name}
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    name="name"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="category">Category</label>
                                <textarea 
                                    value={category}
                                    onChange={(event)=>{setCategory(event.target.value)}}
                                    className="form-control"
                                    id="category"
                                    rows="3"
                                    name="category"></textarea>
                            </div>
                            <div className="form-group">
                                <label htmlFor="price">Price</label>
                                <textarea 
                                    value={price}
                                    onChange={(event)=>{setPrice(event.target.value)}}
                                    className="form-control"
                                    id="price"
                                    rows="3"
                                    name="price"></textarea>
                            </div>
                            <div className="form-group">
                                <label htmlFor="cover">Cover</label>
                                <textarea 
                                    value={cover}
                                    onChange={(event)=>{setCover(event.target.value)}}
                                    className="form-control"
                                    id="cover"
                                    rows="3"
                                    name="cover"></textarea>
                            </div>
                            <div className="form-group">
                                <label htmlFor="ingredients">Ingredients</label>
                                <textarea 
                                    value={ingredients}
                                    onChange={(event)=>{setIngredients(event.target.value)}}
                                    className="form-control"
                                    id="ingredients"
                                    rows="3"
                                    name="ingredients"></textarea>
                            </div>
                            <button 
                                disabled={isSaving}
                                onClick={handleSave} 
                                type="button"
                                className="btn btn-outline-success mt-3">
                                Update Project
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
  
export default ProjectEdit;