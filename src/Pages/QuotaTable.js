import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../Components/Sidebar";
import AddQuota from "../Components/AddQuota";
import Loading from "../Components/Loading";
import { basic_url } from "../Common/constant";
import './Dashboard.css';
function QuotaTable() {
    const [quota, setQuota] = useState([])
    const [update,setUpdate]=useState()
    const [quantity,setQuantity]= useState({
        QValue:"",
        id:"",
        quotaQuant:""
    })
    const [next, setNext] = useState("");
    const [previous, setPrevious] = useState("");
    const [dashboardLoading, setDashboardLoading] = useState(true);
    const [newQuota, setNewQuota] = useState(false)
    window.history.pushState(null, null, window.location.href);
    window.onpopstate = function (event) {
        window.history.go(1);
    }
    useEffect(() => {
        axios({
            method: 'get',
            url: `${basic_url}/supply/quota/`,
            headers: {
                //  'Authorization': `bearer ${token}`,
                'bearer': localStorage.getItem('bearer'),
                'user-id': localStorage.getItem('user-id'),
                'Content-Type': 'application/json'
            },
        }).then((response) => {
            console.log('Quota', response)
            setQuota(response.data.results);
            setNext(response.data.next);
            setPrevious(response.data.previous);
            setDashboardLoading(false)
        }
        )
            .catch((error) => {
                console.log('error', error.response.data)

            })
    }, [newQuota,update])

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
            console.log('Quota', response)
            setQuota(response.data.results);
            setNext(response.data.next);
            setPrevious(response.data.previous);
            setDashboardLoading(false)
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
    const handleChange=(e,id,quotaQuant)=>{
        setQuantity({[e.target.name]: e.target.value,id,quotaQuant})

    }
    const handleSubmit=()=>{
        setDashboardLoading(true)
        console.log(quantity)
        setUpdate("false")
        const payload = {
            // quantity: parseFloat(quantity.QValue)+parseFloat(quantity.quotaQuant)
            quantity:quantity.QValue
        }

        axios({
            method: 'patch',
            url: `${basic_url}/supply/quota/${quantity.id}/`,
            data: payload,
            headers: {
                //  'Authorization': `bearer ${token}`,
                'bearer': localStorage.getItem('bearer'),
                'user-id': localStorage.getItem('user-id'),
                'Content-Type': 'application/json'
            },
        }).then((response) => {
            setDashboardLoading(false)
            console.log(response);
            setUpdate("true")
            setQuantity({
                QValue:"",
                id:"",
                quotaQuant:""
            })
        }
        )
            .catch((error) => {
                console.log('error', error.response.data)
                //   setError(error.response.data)

            })
        
    }
    const findUnit = (unitId) => {
        if (unitId === 100)
            return "Kilogram"
        else if (unitId === 200)
            return "Litre"
        else
            return "Pack"
    }

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
                        <div class="card" onClick={() => setNewQuota(true)}>
                            <div class="card-content">
                                <div class="number">&#43;</div>
                                <div class="card-name">New Ration</div>
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
                    <h3 style={{ color: "#060082", marginLeft: "20px", marginBottom: "10px" }}>Ration Details</h3>
                    <div class="tables">
                        <div class="last-appointments">

                            <table class="appointments">
                                <thead>
                                    <td>Product Name</td>
                                    <td>Quantity</td>
                                    <td>Card Type</td>
                                    <td>Age Group</td>
                                    <td>Update</td>

                                </thead>
                                <tbody>
                                    {quota.map((quota) => (
                                        <tr key={quota.idencode}>
                                            <td>{quota.product.name}</td>
                                            <td>{quota.quantity} {findUnit(quota.product.unit)}</td>
                                            <td>{findCardType(quota.card_type)}</td>
                                            <td>{quota.age_group===100?"Adlut":"Child"}</td>
                                            
                                            <td><div class="input-container">
                                                <input onChange={(e) => {handleChange(e,quota.idencode,quota.quantity)}} name="QValue" type="number" value={quantity.id===quota.idencode?quantity.QValue:""} style={{width:"50px",height:"20px",border:"1px solid black"}} />
                                                <button onClick={handleSubmit} style={{width:"22px",height:"22px",background:"white",fontWeight:"bolder"}}>&#x21bb;</button>
                                            </div></td>
                                        </tr>
                                    ))}

                                </tbody>
                            </table>
                        </div>
                        <div className="switchbutton">
                            {!(previous === null) && <button className="nextbtn" value={previous} onClick={onSwitchPage} >&#8592;Previous</button>}
                            {!(next === null) && <button className="nextbtn" value={next} onClick={onSwitchPage}>Next&#8594;</button>}
                        </div>
                        {newQuota && <AddQuota setNewQuota={setNewQuota} />}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default QuotaTable;