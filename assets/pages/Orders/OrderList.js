import React,{ useState, useEffect} from 'react';
import Layout from "../../components/Layout"
import Swal from 'sweetalert2'
import axios from 'axios';
 
function OrderList() {
    const  [orderList, setOrderList] = useState([])
  
    useEffect(() => {
        fetchOrderList()
    }, [])
  
    const fetchOrderList = () => {
        axios.get('/api/order')
        .then(function (response) {
          setOrderList(response.data);
        })
        .catch(function (error) {
          console.log(error);
        })
    }
  
    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`/api/order/${id}`)
                .then(function (response) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Project deleted successfully!',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    fetchOrderList()
                })
                .catch(function (error) {
                    Swal.fire({
                        icon: 'error',
                        title: 'An Error Occured!',
                        showConfirmButton: false,
                        timer: 1500
                    })
                });
            }
          })
    }
  
    return (
        <Layout>
           <div className="container">
            <h2 className="text-center mt-5 mb-3">Symfony Project Manager</h2>
                <div className="card">
               
                    <div className="card-body">
              
                        <table className="table table-bordered">
                            <thead>
                                <tr>                                    

                                    <th>Total</th>                             
                                    <th>Time</th>
                                    <th>date</th>
                                    <th>cart</th>
                                    <th>Action</th>




                                </tr>
                            </thead>
                            <tbody>
                                {orderList.map((project, key)=>{
                                    return (
                                        <tr key={key}>
                                            <td>{project.total}</td>
                                            <td>{project.time.split('T')[1].split('+')[0]}</td>

                                            <td>{project.date.split('T')[0]}</td>
                                            <td>{project.cart}</td>
                                            <td>
                                            <button 
                                                    onClick={()=>handleDelete(project.id)}
                                                    className="btn btn-outline-danger mx-1">
                                                    Delete
                                                </button>
                                            </td>

                                      
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
  
export default OrderList;