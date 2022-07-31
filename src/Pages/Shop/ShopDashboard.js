import React, { useState, useEffect } from "react";
import axios from "axios";
import TokenView from "../../Components/TokenView";
import Loading from "../../Components/Loading";
import { basic_url } from "../../Common/constant";
import bell from '../../images/bell.png'
import ShowNotification from "../../Components/showNotification";
import '../Dashboard.css';
function ShopDashboard() {
    const [dashboard, setDashboard] = useState([])
    const [token,setToken] = useState([])
    const [update,setUpdate]=useState()
    const [status,setStatus] = useState("100")
    const [changeToken,setChangeToken] = useState(false)
    const [notification,setNotification] = useState(false)
    const [next, setNext] = useState("");
    const [previous, setPrevious] = useState("");
    window.history.pushState(null, null, window.location.href);
    window.onpopstate = function (event) {
        window.history.go(1);
    }

    useEffect(() => {
        localStorage.setItem('TokenId',"")
        axios({
            method: 'get',
            url: `${basic_url}/accounts/shop/dashboard/`,
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

        axios({
            method: 'get',
            url: `${basic_url}/supply/token/?shop=${localStorage.getItem('user-id')}&status=${status}&date=`,
            headers: {
                //  'Authorization': `bearer ${token}`,
                'bearer': localStorage.getItem('bearer'),
                'user-id': localStorage.getItem('user-id'),
                'Content-Type': 'application/json'
            },
        }).then((response) => {
            console.log('Tokens', response)
            setNext(response.data.next);
            setPrevious(response.data.previous);
            setToken(response.data.results);
            localStorage.setItem('TokenId',response.data.results[0].idencode)
        }
        )
            .catch((error) => {
                console.log('error', error.response.data)

            })
    }, [status,update])

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
            console.log('Tokens', response)
            setNext(response.data.next);
            setPrevious(response.data.previous);
            setToken(response.data.results);
        }
        )
            .catch((error) => {
                console.log('error', error.response.data)

            })
        }
        const selectToken=(id)=>{
            localStorage.setItem('TokenId',id)
            setChangeToken(!changeToken)
        }

    return (
        <div>
            {/* {dashboardLoading && <Loading />} */}
            <div class="container">

                <TokenView changeToken={changeToken} setUpdate={setUpdate} update={update}/>

                <div class="main">
                    <div class="top-bar">
                        <div class="search">
                            {/* <input type="text" name="search" placeholder="search here" />
                            <label ><i class="fas fa-search"></i></label> */}
                        </div>
                        <i class="fas fa-bell"></i>
                        <div class="user">
                           <img onClick={()=>setNotification(true)} src={bell} height="30px" width="40px" className="bell" style={{marginTop:"10px"}}/>
                        </div>
                    </div>

                    <div class="cards">
                        <div class="card" style={{ border: status==="100" ? "2px solid green" : "" }} onClick={()=>setStatus("100")}>
                            <div class="card-content">
                                <div class="number">{dashboard.remaining_tokens}</div>
                                <div class="card-name">Initiated</div>
                            </div>
                            <div class="icon-box">
                                <i class="fas fa-briefcase-medical"></i>
                            </div>
                        </div>
                        <div class="card" style={{ border: status==="200" ? "2px solid green" : "" }} onClick={()=>setStatus("200")}>
                            <div class="card-content">
                                <div class="number">{dashboard.completed_tokens}</div>
                                <div class="card-name">Completed</div>
                            </div>
                            <div class="icon-box">
                                <i class="fas fa-wheelchair"></i>
                            </div>
                        </div>
                        <div class="card" style={{ border: status==="300" ? "2px solid green" : "" }} onClick={()=>setStatus("300")}>
                            <div class="card-content">
                                <div class="number">{dashboard.canceled_tokens}</div>
                                <div class="card-name">Cancelled</div>
                            </div>
                            <div class="icon-box">
                                <i class="fas fa-bed"></i>
                            </div>
                        </div>
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
                                {token.map((token) => (
                                    <tr key={token.idencode} style={{cursor:"pointer"}} onClick={()=>selectToken(token.idencode)}>
                                        <td >{token.number}</td>
                                        <td >{token.card.card_number}</td>
                                        <td >{token.card.holder_name}</td>
                                        <td >{token.time}</td>
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
            {notification && <ShowNotification setNotification={setNotification}/>}
        </div>
    );
}

export default ShopDashboard;