import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../Components/Sidebar";
import './Dashboard.css';
function ShopTable() {
    const [shop, setShop] = useState([])
    window.history.pushState(null, null, window.location.href);
    window.onpopstate = function (event) {
        window.history.go(1);
    }
    useEffect(() => {
        axios({
            method: 'get',
            url: `https://ration-master.herokuapp.com/accounts/signup/shop/?location=&verified=`,
            headers: {
                //  'Authorization': `bearer ${token}`,
                'bearer': localStorage.getItem('bearer'),
                'user-id': localStorage.getItem('user-id'),
                'Content-Type': 'application/json'
            },
        }).then((response) => {
            console.log('shopData', response)
            setShop(response.data.results);
        }
        )
            .catch((error) => {
                console.log('error', error.response.data)

            })
    }, [])

    const ShopVerify = (id) => {
        axios({
            method: 'patch',
            url: `https://ration-master.herokuapp.com/accounts/verify/shop/${id}/`,
            headers: {
                //  'Authorization': `bearer ${token}`,
                'bearer': localStorage.getItem('bearer'),
                'user-id': localStorage.getItem('user-id'),
                'Content-Type': 'application/json'
            },
        }).then((response) => {
            console.log('shopData', response)
        }
        )
            .catch((error) => {
                console.log('error', error.response.data)

            })
    }
    return (
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
                    <div class="card">
                        <div class="card-content">
                            <div class="number">67</div>
                            <div class="card-name">Appointments</div>
                        </div>
                        <div class="icon-box">
                            <i class="fas fa-briefcase-medical"></i>
                        </div>
                    </div>
                    <div class="card">
                        <div class="card-content">
                            <div class="number">105</div>
                            <div class="card-name">New Patients</div>
                        </div>
                        <div class="icon-box">
                            <i class="fas fa-wheelchair"></i>
                        </div>
                    </div>
                    <div class="card">
                        <div class="card-content">
                            <div class="number">8</div>
                            <div class="card-name">Operations</div>
                        </div>
                        <div class="icon-box">
                            <i class="fas fa-bed"></i>
                        </div>
                    </div>
                    <div class="card">
                        <div class="card-content">
                            <div class="number">$4500</div>
                            <div class="card-name">Earnings</div>
                        </div>
                        <div class="icon-box">
                            <i class="fas fa-dollar-sign"></i>
                        </div>
                    </div>
                </div>
                <div class="tables">
                    <div class="last-appointments">

                        <table class="appointments">
                            <thead>
                                <td>Shop Name</td>
                                <td>Location</td>
                                <td>Employee Id</td>
                                <td>Employee Name</td>
                                <td>Email</td>
                                <td>Mobile</td>
                                <td>Actions</td>
                            </thead>
                            <tbody>
                            {shop.map((shop) => (
                        <tr key={shop.idencode}>
                            <td >{shop.first_name}</td>
                            <td>{shop.location}</td>
                            <td >{shop.employee_name}</td>
                            <td >{shop.employee_id}</td>
                            <td >{shop.email}</td>
                            <td >{shop.mobile}</td>
                            <td><button style={{marginRight:"10px"}}  onClick={() => ShopVerify(shop.idencode)}>&#9989;</button>
                            <button>&#10060;</button></td>

                        </tr>
                    ))}

                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default ShopTable;