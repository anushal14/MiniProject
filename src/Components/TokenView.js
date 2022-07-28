import React, { useState, useEffect } from "react";
import LogoutDialog from "./LogoutDialogue";
import './TokenView.css'
import { useNavigate } from 'react-router-dom';
import axios from "axios";
function TokenView(props) {
    let navigate = useNavigate();
    const [dialogue, setDialogue] = useState(false);
    const [tokenData, setTokenData] = useState([])
    const [tokenDataCard, setTokenDataCard] = useState([])
    const [tokenDataCardMembers, setTokenDataCardMembers] = useState([])
    const [tokenDataPurchase, setTokenDataPurchase] = useState([])

    useEffect(() => {
        axios({
            method: 'get',
            url: `https://ration-master.herokuapp.com/supply/token/get/${localStorage.getItem('TokenId')}/`,
            headers: {
                //  'Authorization': `bearer ${token}`,
                'bearer': localStorage.getItem('bearer'),
                'user-id': localStorage.getItem('user-id'),
                'Content-Type': 'application/json'
            },
        }).then((response) => {
            console.log('Single Token', response)
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

    const onLogout = () => {
        navigate(`/`);
        localStorage.clear();
    }
    const findUnit = (unitId) => {
        if (unitId === 100)
            return "Kilogram"
        else if (unitId === 200)
            return "Litre"
        else
            return "Pack"
    }
    const findCardType = (type) => {
        if (type === 100)
            return "rgba(255, 255, 0, 0.433)"
        else if (type === 200)
            return "rgba(255, 0, 187, 0.433)"
        else if (type === 300)
            return "rgb(252, 252, 253)"
        else if (type === 400)
            return "rgba(0, 21, 255, 0.433)"
    }

    return (
        <div class="sidebar">
            <ul>
                <li>
                    <a href="">
                        <i class="fas fa-clinic-medical"></i>
                        <div class="title">VQ Ration</div>
                    </a>
                </li>
                <div style={{ background: "white", height: "550px", borderRight: "0px solid" }}>
                    <div class="Sidecard" style={{ background: findCardType(tokenDataCard.card_type) }}>
                        <div class="card-header">
                            <h2>Card: {tokenDataCard.card_number}</h2>
                            <div class="card-info">
                                <span >{tokenData.time}</span>
                                <span ></span>
                                <span >Token No: {tokenData.number}</span>
                            </div>
                        </div>
                        <div class="card-body">
                            <div>Mob: {tokenDataCard.mobile}</div>
                            <div class="item-card">
                                <div class="head">
                                    <h3 class="titles">Purchased Products</h3>
                                </div>
                                <div class="subtitle">
                                    {tokenDataPurchase.map((purchase) => (
                                        <div key={purchase.quantity}>
                                            <div>{purchase.product.name} ______ {purchase.quantity} {findUnit(purchase.product.unit)}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div class="item-card">
                                <div class="head">
                                    <h3 class="titles">Members</h3>
                                </div>
                                <div class="subtitle">
                                {tokenDataCardMembers.map((member) => (
                        <div key={member.idencode}>
                            <div>{member.name} - - - {member.age} yrs - - - {member.occupation}</div>
                        </div>
                    ))}
                                </div>
                            </div>
                            <div style={{position: "absolute",bottom:"140px",justifyContent:"space-around"}}>
                        <button value="300" className="Tokenbtn" style={{background:"red"}} onClick={(e)=>{console.log(e.target.value)}}>Cancel</button>
                        <button value="200" className="Tokenbtn" style={{background:"rgb(34, 139, 34)"}} onClick={(e)=>{console.log(e.target.value)}}>Complete</button>
                        </div>
                        </div>
                        
                    </div>
                </div>
                <li style={{ position: "absolute", bottom: "40px" }} onClick={() => setDialogue(true)}>
                    <a href="#">
                        <i class="fas fa-question"></i>
                        <div class="title">Log Out</div>
                    </a>
                </li>
            </ul>
            {dialogue && <LogoutDialog onDialog={setDialogue} onLogout={onLogout} />}
        </div>
    );
}

export default TokenView;