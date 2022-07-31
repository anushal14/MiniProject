import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../Components/Sidebar";
import './Dashboard.css';
import { basic_url } from "../Common/constant";
import Loading from "../Components/Loading";
function ShopTable() {
    const [shop, setShop] = useState([])
    const [dashboard,setDashboard] = useState([])
    const [next, setNext] = useState("");
    const [previous, setPrevious] = useState("");
    const [update,setUpdate]=useState()
    const [dashboardLoading, setDashboardLoading] = useState(true);
    const [verify, setVerify] = useState(false)
    window.history.pushState(null, null, window.location.href);
    window.onpopstate = function (event) {
        window.history.go(1);
    }
    useEffect(() => {
        axios({
            method: 'get',
            url: `${basic_url}/accounts/signup/shop/?location=&verified=${verify}`,
            headers: {
                //  'Authorization': `bearer ${token}`,
                'bearer': localStorage.getItem('bearer'),
                'user-id': localStorage.getItem('user-id'),
                'Content-Type': 'application/json'
            },
        }).then((response) => {
            console.log('shopData', response)
            setShop(response.data.results);
            setNext(response.data.next);
            setPrevious(response.data.previous);
            setDashboardLoading(false)
        }
        )
            .catch((error) => {
                console.log('error', error.response.data)

            })
            axios({
                method: 'get',
                url: `${basic_url}/accounts/admin/dashboard/`,
                headers: {
                    //  'Authorization': `bearer ${token}`,
                    'bearer': localStorage.getItem('bearer'),
                    'user-id': localStorage.getItem('user-id'),
                    'Content-Type': 'application/json'
                },
            }).then((response) => {
                console.log('Dashboard', response)
                setDashboard(response.data.data)
               
            }
            )
                .catch((error) => {
                    console.log('error', error.response.data)
    
                })
    }, [verify,update])

    const switchTable = () => {
        setDashboardLoading(true)
        setVerify(!verify)
    }

    const ShopVerify = (id) => {
        setUpdate("false")
        
        axios({
            method: 'patch',
            url: `${basic_url}/accounts/verify/shop/${id}/`,
            headers: {
                //  'Authorization': `bearer ${token}`,
                'bearer': localStorage.getItem('bearer'),
                'user-id': localStorage.getItem('user-id'),
                'Content-Type': 'application/json'
            },
        }).then((response) => {
            setUpdate("true")
            console.log('shopData', response)

        }
        )
            .catch((error) => {
                console.log('error', error.response.data)

            })
    }
    const ShopDelete = (id) => {
        setUpdate("false")
        axios({
            method: 'patch',
            url: `${basic_url}/accounts/delete/shop/${id}/`,
            headers: {
                //  'Authorization': `bearer ${token}`,
                'bearer': localStorage.getItem('bearer'),
                'user-id': localStorage.getItem('user-id'),
                'Content-Type': 'application/json'
            },
        }).then((response) => {
            console.log('shopData', response)
            setUpdate("true")

        }
        )
            .catch((error) => {
                console.log('error', error.response.data)

            })
    }

    const onSwitchPage = (e) => {
        axios({
            method: 'get',
            url: e.target.value,
            headers: {
                //  'Authorization': `bearer ${token}`,
                'bearer': localStorage.getItem('bearer'),
                'user-id': localStorage.getItem('user-id'),
                'Content-Type': 'application/json'
            },
        }).then((response) => {
            console.log('shopData', response)
            setShop(response.data.results);
            setNext(response.data.next);
            setPrevious(response.data.previous);
            setDashboardLoading(false)
        }
        )
            .catch((error) => {
                console.log('error', error.response.data)

            })
        }

    return (<div>
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
                    <div class="card" onClick={switchTable} style={{ border: verify ? "" : "2px solid green" }}>
                        <div class="card-content">
                            <div class="number">{dashboard.non_verified_shops}</div>
                            <div class="card-name">Non-Verified</div>
                        </div>
                        <div class="icon-box">
                            <i class="fas fa-briefcase-medical"></i>
                        </div>
                    </div>
                    <div class="card" onClick={switchTable} style={{ border: verify ? "2px solid green" : "" }}>
                        <div class="card-content">
                            <div class="number">{dashboard.verified_shops}</div>
                            <div class="card-name">Verified</div>
                        </div>
                        <div class="icon-box">
                            <i class="fas fa-wheelchair"></i>
                        </div>
                    </div>
                    {/* <div class="card">
                        <div class="card-content">
                            <div class="number">8</div>
                            <div class="card-name">dgret</div>
                        </div>
                        <div class="icon-box">
                            <i class="fas fa-bed"></i>
                        </div>
                    </div>
                    <div class="card">
                        <div class="card-content">
                            <div class="number">4500</div>
                            <div class="card-name">retrtert</div>
                        </div>
                        <div class="icon-box">
                            <i class="fas fa-dollar-sign"></i>
                        </div>
                    </div> */}
                </div>
                <h3 style={{ color: "#060082", marginLeft: "20px", marginBottom: "10px" }}>Shop Details</h3>
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
                                {!verify && <td>Actions</td>}
                            </thead>
                            <tbody>
                                {shop.map((shop) => (
                                    <tr key={shop.idencode}>
                                        <td >{shop.first_name}</td>
                                        <td>{shop.location}</td>

                                        <td >{shop.employee_id}</td>
                                        <td >{shop.employee_name}</td>
                                        <td >{shop.email}</td>
                                        <td >{shop.mobile}</td>
                                        {!verify && <td><button style={{ marginRight: "10px" }} onClick={() => ShopVerify(shop.idencode)}>&#9989;</button>
                                            <button onClick={() => ShopDelete(shop.idencode)}>&#10060;</button></td>}

                                    </tr>
                                ))}

                            </tbody>
                        </table>
                      
                    </div>
                    <div className="switchbutton">
                    {!(previous === null) &&<button className="nextbtn" value={previous} onClick={onSwitchPage} >&#8592;Previous</button>}
                    {!(next === null) && <button className="nextbtn" value={next} onClick={onSwitchPage}>Next&#8594;</button>}
                        </div>
                </div>
            </div>
        </div>
    </div>
    );
}

export default ShopTable;