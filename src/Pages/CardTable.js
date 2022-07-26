import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../Components/Sidebar";
import './Dashboard.css';
import { basic_url } from "../Common/constant";
import Loading from "../Components/Loading";
function CardTable() {
    const [card, setCard] = useState([])
    const [dashboard,setDashboard] = useState([])
    const [next, setNext] = useState("");
    const [previous, setPrevious] = useState("");
    const [dashboardLoading, setDashboardLoading] = useState(true);
    const [verify, setVerify] = useState(false)
    const [update,setUpdate]=useState()
    window.history.pushState(null, null, window.location.href);
    window.onpopstate = function (event) {
        window.history.go(1);
    }
    useEffect(() => {
        axios({
            method: 'get',
            url: `${basic_url}/accounts/signup/card/?number=&verified=${verify}`,
            headers: {
                //  'Authorization': `bearer ${token}`,
                'bearer': localStorage.getItem('bearer'),
                'user-id': localStorage.getItem('user-id'),
                'Content-Type': 'application/json'
            },
        }).then((response) => {
            console.log('cardData', response)
            setCard(response.data.results);
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

    const switchTable=()=>{
        setDashboardLoading(true)
        setVerify(!verify)
    }

    const CardVerify = (id) => {
        setUpdate("false")
        axios({
            method: 'patch',
            url: `${basic_url}/accounts/verify/card/${id}/`,
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

    const CardDelete = (id) => {
        setUpdate("false")
        axios({
            method: 'patch',
            url: `${basic_url}/accounts/delete/card/${id}/`,
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
            console.log('cardData', response)
            setCard(response.data.results);
            setDashboardLoading(false)
            setNext(response.data.next);
            setPrevious(response.data.previous);
        }
        )
            .catch((error) => {
                console.log('error', error.response.data)

            })
        }
        const findCardType = (type) => {
            if (type === 100)
                return "Yellow"
            else if (type === 200)
                return "Pink"
            else if (type === 300)
                return "White"
            else
                return "Blue"
        }
    return (
        <div>
            {dashboardLoading && <Loading/>}
        
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
                <div class="card" onClick={switchTable} style={{border:verify?"":"2px solid green"}}>
                        <div class="card-content">
                            <div class="number">{dashboard.non_verified_cards}</div>
                            <div class="card-name">Non-Verified</div>
                        </div>
                        <div class="icon-box">
                            <i class="fas fa-briefcase-medical"></i>
                        </div>
                    </div>
                    <div class="card" onClick={switchTable} style={{border:verify?"2px solid green":""}}>
                        <div class="card-content">
                            <div class="number">{dashboard.verified_cards}</div>
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
                <h3 style={{color:"#060082",marginLeft:"20px",marginBottom:"10px"}}>Card Details</h3>
                <div class="tables">
                    <div class="last-appointments">

                        <table class="appointments">
                            <thead>
                                <td>Card Number</td>
                                <td>Holder Name</td>
                                <td>Card Type</td>
                                <td>Email</td>
                                <td>Mobile</td>
                                {!verify && <td>Actions</td>}
                            </thead>
                            <tbody>
                            {card.map((card) => (
                        <tr key={card.idencode}>
                            <td >{card.card_number}</td>
                            <td>{card.holder_name}</td>
                            <td >{findCardType(card.card_type)}</td>
                            <td >{card.email}</td>
                            <td >{card.mobile}</td>
                            {!verify && <td><button style={{marginRight:"10px"}}  onClick={() => CardVerify(card.idencode)}>&#9989;</button>
                            <button onClick={() => CardDelete(card.idencode)}>&#10060;</button></td>}

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

export default CardTable;