import React, { useState, useEffect } from "react";
import axios from "axios";
import CardView from "../../Components/CardView";
import Loading from "../../Components/Loading";
import '../Dashboard.css';
function CardDashboard() {
    const [next, setNext] = useState("");
    const [previous, setPrevious] = useState("");
    const [tokenData, setTokenData] = useState([])
    const [tokenDataCard, setTokenDataCard] = useState([])
    const [tokenDataCardMembers, setTokenDataCardMembers] = useState([])
    const [tokenDataPurchase, setTokenDataPurchase] = useState([])

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
            setTokenDataCard(response.data.card)
            setTokenDataPurchase(response.data.purchase)
            setTokenDataCardMembers(response.data.card.members)

        }
        )
            .catch((error) => {
                console.log('error', error.response.data)

            })

    }, [])

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
                       
                        <div class="card">
                            <div class="card-content">
                                <div class="number">6</div>
                                <div class="card-name">Members</div>
                            </div>
                            <div class="icon-box">
                                <i class="fas fa-wheelchair"></i>
                            </div>
                        </div>
                        <div class="card">
                            <div class="card-content">
                                <div class="number">7</div>
                                <div class="card-name">Purchased items</div>
                            </div>
                            <div class="icon-box">
                                <i class="fas fa-bed"></i>
                            </div>
                        </div>
                        { tokenData!==null && <div class="card neonShadow" style={{width:"100px",height:"8px"}}>
                            <div class="card-content">
                                {/* <div class="number">4</div> */}
                                <div class="card-name">Create Token</div>
                            </div>
                            <div class="icon-box">
                                <i class="fas fa-briefcase-medical"></i>
                            </div>
                        </div>}
                        {/* <div class="card">
                        <div class="card-content">
                        <div class="number">67</div>
                            <div class="card-name">retrtert</div>
                        </div>
                        <div class="icon-box">
                            <i class="fas fa-dollar-sign"></i>
                        </div>
                    </div> */}
                    </div>
                    <h3 style={{ color: "#060082", marginLeft: "20px", marginBottom: "10px" }}>Token Details</h3>
                    <div class="tables">
                        <div class="last-appointments">

                            <table class="appointments">
                                <thead>
                                    <td>Token Number</td>
                                    <td>Card Number</td>
                                    <td>Card Owner</td>
                                    <td>Time</td>

                                </thead>
                                <tbody>
                                {tokenDataPurchase.map((purchase) => (
                                        <div key={purchase.quantity}>
                                            <div>{purchase.product.name} ______ {purchase.quantity} {findUnit(purchase.product.unit)}</div>
                                        </div>
                                    ))}

                                </tbody>
                            </table>
                        </div>
                        <div className="switchbutton">
                    {!(previous === null) &&<button className="nextbtn" value={previous}  >&#8592;Previous</button>}
                    {!(next === null) && <button className="nextbtn" value={next} >Next&#8594;</button>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CardDashboard;