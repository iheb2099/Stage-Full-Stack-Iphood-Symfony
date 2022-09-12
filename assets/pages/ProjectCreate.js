import React, {useState} from 'react';
import { Link } from "react-router-dom";
import Layout from "../components/Layout"
import Swal from 'sweetalert2'
import axios from 'axios';
  
function ProjectCreate() {
    const [name, setName] = useState('');
    const [category, setCategory] = useState('')
    const [price, setPrice] = useState(1)
    const [cover, setCover] = useState('')
    const [ingredients, setIngredients] = useState('')
    const [isSaving, setIsSaving] = useState(false)
  
    const handleSave = () => {
        setIsSaving(true);
        let formData = new FormData()
        formData.append("name", name)
        formData.append("category", category)
        formData.append("cover", cover)
        formData.append("price", price)
        formData.append("ingredients", ingredients)
        axios.post('/api/project', formData)
          .then(function (response) {
            Swal.fire({
                icon: 'success',
                title: 'Project saved successfully!',
                showConfirmButton: false,
                timer: 1500
            })
            setIsSaving(false);
            setName('')
            setCategory('')
            setPrice(1)
            setCover('')
            setIngredients('')
          })
          .catch(function (error) {
            Swal.fire({
                icon: 'error',
                title: `An Error Occured! ${error}`,
                showConfirmButton: false,
                timer: 1500
            })
            setIsSaving(false)
          });
    }
  
    return (
        <Layout>
            <div className="container">
                <h2 className="text-center mt-5 mb-3">Create New Food Item</h2>
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
                                <label htmlFor="ingredients">ingredients</label>
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
                                className="btn btn-outline-primary mt-3">
                                Save Project
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
  
export default ProjectCreate;