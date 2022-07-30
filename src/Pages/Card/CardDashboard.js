import React, { useState, useEffect } from "react";
import axios from "axios";
import CardView from "../../Components/CardView";
import CreatToken from "../../Components/CreateToken";
import CreatPurchase from "../../Components/CreatePurchase";
import Loading from "../../Components/Loading";
import '../Dashboard.css';
function CardDashboard() {
    const [availableQuota,setAvailableQuota]= useState([])
    const [dashboardLoading, setDashboardLoading] = useState(true)
    const [tokenData, setTokenData] = useState([])
    const [tokenDataPurchase, setTokenDataPurchase] = useState([])
    const [tokenDataAvailable, setTokenDataAvailable] = useState([])
    const [itemType,setItemType]= useState("available")
    const[newToken,setNewToken]=useState(false)
    const [newPurchase,setNewPurchase]=useState(false)

    window.history.pushState(null, null, window.location.href);
    window.onpopstate = function (event) {
        window.history.go(1);
    }
    useEffect(() => {
        axios({
            method: 'get',
            url: `https://ration-master.herokuapp.com/supply/token/active/`,
            headers: {
                //  'Authorization': `bearer ${token}`,
                'bearer': localStorage.getItem('bearer'),
                'user-id': localStorage.getItem('user-id'),
                'Content-Type': 'application/json'
            },
        }).then((response) => {
            console.log('Active token', response)
            setTokenData(response.data)
            setTokenDataPurchase(response.data.purchase)
            setTokenDataAvailable(response.data.available)
            localStorage.setItem('activeToken',response.data.idencode)
            setDashboardLoading(false)
        }
        )
            .catch((error) => {
                console.log('error', error.response.data)

            })

            axios({
                method: 'get',
                url: `https://ration-master.herokuapp.com/accounts/get/card/${localStorage.getItem('user-id')}/`,
                headers: {
                    //  'Authorization': `bearer ${token}`,
                    'bearer': localStorage.getItem('bearer'),
                    'user-id': localStorage.getItem('user-id'),
                    'Content-Type': 'application/json'
                },
            }).then((response) => {
                console.log('Card Details1', response)
                setAvailableQuota(response.data.available_quota)
                
            }
            )
                .catch((error) => {
                    console.log('error', error.response.data)
    
                })

    }, [newPurchase,newToken])

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
            {/* {dashboardLoading && <Loading />} */}
            <div class="container">

                <CardView tokenData={tokenData}/>

                <div class="main"  style={{marginLeft:"102px",width:"1132px"}}>
                    <div class="top-bar">
                        <div class="search">
                            <input type="text" name="search" placeholder="search here" />
                            <label ><i class="fas fa-search"></i></label>
                        </div>
                        <i class="fas fa-bell"></i>
                        <div class="user">
                            <img src="doctor1.png" alt="" />
                        </div>
                    </div>

                    <div class="cards">
                       
                        <div onClick={()=>setItemType("available")} class="card" style={{border:itemType==="available"?"2px solid green":""}}>
                            <div class="card-content">
                                <div class="number"></div>
                                <div class="card-name">Available Ration</div>
                            </div>
                            <div class="icon-box">
                                <i class="fas fa-wheelchair"></i>
                            </div>
                        </div>
                        <div onClick={()=>setItemType("purchased")} class="card" style={{border:itemType==="purchased"?"2px solid green":""}}>
                            <div class="card-content">
                                <div class="number"></div>
                                <div class="card-name">Purchased items</div>
                            </div>
                            <div class="icon-box">
                                <i class="fas fa-bed"></i>
                            </div>
                        </div>
                        <div onClick={()=>setItemType("monthly")} class="card" style={{border:itemType==="monthly"?"2px solid green":""}}>
                            <div class="card-content">
                                <div class="number"></div>
                                <div class="card-name">View My Ration</div>
                            </div>
                            <div class="icon-box">
                                <i class="fas fa-wheelchair"></i>
                            </div>
                        </div>
                        { tokenData.length===0 && <div onClick={()=>setNewToken(true)} class="card neonShadow" style={{width:"100px",height:"8px",marginTop:"13px"}}>
                            <div class="card-content">
                                <div class="number" style={{fontSize:"17px"}}>Create Token</div>
                                <div class="card-name"></div>
                            </div>
                            <div class="icon-box">
                                <i class="fas fa-briefcase-medical"></i>
                            </div>
                        </div>}
                        { tokenData.length!==0 && tokenData.status===100 && <div onClick={()=>setNewPurchase(true)} class="card" style={{width:"100px",height:"8px",marginTop:"13px",background:"#4169E1"}}>
                            <div class="card-content">
                                <div class="number" style={{fontSize:"14px",color:"white"}}>Purchase here</div>
                                <div class="card-name"></div>
                            </div>
                            <div class="icon-box">
                                <i class="fas fa-briefcase-medical"></i>
                            </div>
                        </div>}
                    </div>

                    {itemType==="monthly" && <>
                    <h3 style={{ color: "#060082", marginLeft: "20px", marginBottom: "10px" }}>Current Month Ration</h3>
                    <div class="tables">
                        <div class="last-appointments">

                            <table class="appointments">
                                <thead>
                                    <td>Product</td>
                                    <td>Quantity</td>

                                </thead>
                                <tbody>
                                {availableQuota.map((quota) => (
                                        <tr key={quota.idencode}>
                                          <td>{quota.name}</td> 
                                          <td>{quota.quantity} {findUnit(quota.unit)}</td> 
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div></>}

                    {itemType==="purchased" && <> <h3 style={{ color: "#060082", marginLeft: "20px", marginBottom: "10px" }}>Purchased Items</h3>
                    <div class="tables">
                        <div class="last-appointments">

                            <table class="appointments">
                                <thead>
                                    <td>Product</td>
                                    <td>Quantity</td>

                                </thead>
                                <tbody>
                                {tokenDataPurchase.map((item) => (
                                        <tr key={item.idencode}>
                                          <td>{item.product.name}</td> 
                                          <td>{item.quantity} {findUnit(item.product.unit)}</td> 
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div></>}

                   {itemType==="available" && <> <h3 style={{ color: "#060082", marginLeft: "20px", marginBottom: "10px" }}>Available Items</h3>
                    <div class="tables">
                        <div class="last-appointments">

                            <table class="appointments">
                                <thead>
                                    <td>Product</td>
                                    <td>Quantity</td>

                                </thead>
                                <tbody>
                                {tokenDataAvailable.map((item) => (
                                        <tr key={item.idencode}>
                                          <td>{item.name}</td> 
                                          <td>{item.quantity} {findUnit(item.unit)}</td> 
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div></>}

                </div>
            </div>
            {newToken && <CreatToken setNewToken={setNewToken}/>}
            {newPurchase && <CreatPurchase setNewPurchase={setNewPurchase} tokenDataAvailable={tokenDataAvailable}/>}
        </div>
    );
}

export default CardDashboard;