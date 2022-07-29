import React, { useState, useEffect } from "react";
import LogoutDialog from "./LogoutDialogue";
import './TokenView.css'
import AddMember from "./AddMember";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
function CardView(props) {
    let navigate = useNavigate();
    const [dialogue, setDialogue] = useState(false);
    const [members,setMembers]= useState([])
    const [cardData,setCardData]= useState([])
    const [newMember, setNewMember] = useState(false)
    useEffect(() => {
        axios({
            method: 'get',
            url: `https://ration-master.herokuapp.com/accounts/member/?card=${localStorage.getItem('user-id')}`,
            headers: {
                //  'Authorization': `bearer ${token}`,
                'bearer': localStorage.getItem('bearer'),
                'user-id': localStorage.getItem('user-id'),
                'Content-Type': 'application/json'
            },
        }).then((response) => {
            console.log('Members', response)
            setMembers(response.data.results)
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
                console.log('Card Details', response)
                setCardData(response.data)
                
            }
            )
                .catch((error) => {
                    console.log('error', error.response.data)
    
                })
    }, [newMember])
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
    const findCardType = (id) => {
        
           if (id===100)
           return "rgba(255, 255, 0, 0.433)"
           if (id===200)
           return "rgba(255, 0, 187, 0.433)"
           if (id===300)
           return "rgb(252, 252, 253)"
           if (id===400)
           return "rgba(0, 21, 255, 0.433)"

    }

    return (
        <div class="sidebar" style={{width:"400px"}}>
            <ul>
                <li>
                    <a href="">
                        <i class="fas fa-clinic-medical"></i>
                        <div class="title">VQ Ration</div>
                    </a>
                </li>
                <div style={{ background: "white", height: "550px", borderRight: "0px solid" }}>
                    <div class="Sidecard" style={{ background: findCardType(cardData.card_type) }}>
                        <div class="card-header">
                            <h2>Card No: {localStorage.getItem('cardNo')}</h2>
                            <div class="card-info">
                                <span style={{color:props.tokenData!==null?"green":"red"}}>Token: {props.tokenData!==null?"Active":"Not Active"}</span>
                                <span ></span>
                                <span >Mob No: {cardData.mobile}</span>
                            </div>
                        </div>
                        <div class="card-body">
                            {/* <div>Mob: {tokenDataCard.mobile}</div> */}
                            
                            <div class="item-card">
                                <h3><span style={{fontWeight:"400"}}>Owner Name:</span> {cardData.holder_name}</h3>
                                <div style={{padding:"5px 0"}}>Email: {cardData.email}</div>
                                <div class="head">
                                    <h3 class="titles">Members</h3>
                                </div>
                                <table class="appointments">
                                <thead>
                                <td>Name</td>
                                    <td>Age</td>
                                    <td>Job</td>
                                </thead>
                                <tbody>
                                {members.map((member) => (
                        <tr key={member.idencode}>
                            <td>{member.name}</td><td>{member.age} yrs</td><td>{member.occupation}</td>
                        </tr>
                    ))}

                                </tbody>
                                <button onClick={()=>setNewMember(true)} style={{background:"#0004ffbf",color:"white",width:"100px",padding:"5px",borderRadius:"5px"}} >Add Member</button>
                            </table>
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
            {newMember && <AddMember setNewMember={setNewMember}/>}
        </div>
    );
}

export default CardView;