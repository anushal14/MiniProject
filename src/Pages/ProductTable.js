import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../Components/Sidebar";
import AddProduct from "../Components/AddProduct";
import Loading from "../Components/Loading";
import './Dashboard.css';
function ProductTable() {
    const [product, setProduct] = useState([])
    const [dashboardLoading, setDashboardLoading] = useState(true);
    const [newProduct, setNewProduct] = useState(false)
    window.history.pushState(null, null, window.location.href);
    window.onpopstate = function (event) {
        window.history.go(1);
    }
    useEffect(() => {
        axios({
            method: 'get',
            url: `https://ration-master.herokuapp.com/supply/products/`,
            headers: {
                //  'Authorization': `bearer ${token}`,
                'bearer': localStorage.getItem('bearer'),
                'user-id': localStorage.getItem('user-id'),
                'Content-Type': 'application/json'
            },
        }).then((response) => {
            console.log('Product', response)
            setProduct(response.data.results);
            setDashboardLoading(false)
        }
        )
            .catch((error) => {
                console.log('error', error.response.data)

            })
    }, [newProduct])


    return (
        <div>
            {dashboardLoading && <Loading />}
        <div class="container">
            
            <Sidebar />

            <div class="main">
                <div class="top-bar">
                    <div class="search">
                        <input type="text" name="search" placeholder="search here" />
                        <label for="search"><i class="fas fa-search"></i></label>
                    </div>
                    <i class="fas fa-bell"></i>
                    <div class="user">
                        <img src="doctor1.png" alt="" />
                    </div>
                </div>
                <div class="cards">
                    <div class="card" onClick={() => setNewProduct(true)}>
                        <div class="card-content">
                            <div class="number">&#43;</div>
                            <div class="card-name">New Product</div>
                        </div>
                        <div class="icon-box">
                            <i class="fas fa-briefcase-medical"></i>
                        </div>
                    </div>
                    {/* <div class="card">
                        <div class="card-content">
                        <div class="number">67</div>
                            <div class="card-name">ertreg</div>
                        </div>
                        <div class="icon-box">
                            <i class="fas fa-wheelchair"></i>
                        </div>
                    </div>
                    <div class="card">
                        <div class="card-content">
                        <div class="number">67</div>
                            <div class="card-name">dgret</div>
                        </div>
                        <div class="icon-box">
                            <i class="fas fa-bed"></i>
                        </div>
                    </div>
                    <div class="card">
                        <div class="card-content">
                        <div class="number">67</div>
                            <div class="card-name">retrtert</div>
                        </div>
                        <div class="icon-box">
                            <i class="fas fa-dollar-sign"></i>
                        </div>
                    </div> */}
                </div>
                <div class="tables">
                    <div class="last-appointments">

                        <table class="appointments">
                            <thead>
                                <td>Product Name</td>
                                <td>Unit</td>

                            </thead>
                            <tbody>
                                {product.map((product) => (
                                    <tr key={product.idencode}>
                                        <td >{product.name}</td>
                                        <td>{product.unit}</td>

                                    </tr>
                                ))}

                            </tbody>
                        </table>
                    </div>
                    {newProduct && <AddProduct setNewProduct={setNewProduct} />}
                </div>
            </div>
            </div>
        </div>
    );
}

export default ProductTable;