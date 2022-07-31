import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../Components/Sidebar";
import AddStock from "../Components/AddStock";
import Loading from "../Components/Loading";
import { basic_url } from "../Common/constant";
import './Dashboard.css';
function StockTable() {
    const [stock, setStock] = useState([])
    const [update,setUpdate]=useState()
    const [quantity,setQuantity]= useState({
        QValue:"",
        id:"",
        stockQuant:""
    })
    const [next, setNext] = useState("");
    const [previous, setPrevious] = useState("");
    const [dashboardLoading, setDashboardLoading] = useState(true);
    const [newStock, setNewStock] = useState(false)
    window.history.pushState(null, null, window.location.href);
    window.onpopstate = function (event) {
        window.history.go(1);
    }
    useEffect(() => {
        axios({
            method: 'get',
            url: `${basic_url}/supply/stock/?shop=&product=`,
            headers: {
                //  'Authorization': `bearer ${token}`,
                'bearer': localStorage.getItem('bearer'),
                'user-id': localStorage.getItem('user-id'),
                'Content-Type': 'application/json'
            },
        }).then((response) => {
            console.log('Stock', response)
            setStock(response.data.results);
            setNext(response.data.next);
            setPrevious(response.data.previous);
            setDashboardLoading(false)
        }
        )
            .catch((error) => {
                console.log('error', error.response.data)

            })
    }, [newStock,update])

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
            console.log('Stock', response)
            setStock(response.data.results);
            setNext(response.data.next);
            setPrevious(response.data.previous);
            setDashboardLoading(false)
        }
        )
            .catch((error) => {
                console.log('error', error.response.data)

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
    const handleChange=(e,id,stockQuant)=>{
        setQuantity({[e.target.name]: e.target.value,id,stockQuant})

    }
    const handleSubmit=()=>{
        setDashboardLoading(true)
        console.log(quantity)
        setUpdate("false")
        const payload = {
            quantity: parseFloat(quantity.QValue)+parseFloat(quantity.stockQuant)
        }

        axios({
            method: 'patch',
            url: `${basic_url}/supply/stock/${quantity.id}/`,
            data: payload,
            headers: {
                //  'Authorization': `bearer ${token}`,
                'bearer': localStorage.getItem('bearer'),
                'user-id': localStorage.getItem('user-id'),
                'Content-Type': 'application/json'
            },
        }).then((response) => {
            console.log(response);
            setDashboardLoading(false)
            setUpdate("true")
            setQuantity({
                QValue:"",
                id:"",
                stockQuant:""
            })
        }
        )
            .catch((error) => {
                console.log('error', error.response.data)
                //   setError(error.response.data)

            })
        
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
                        <div class="card" onClick={() => setNewStock(true)}>
                            <div class="card-content">
                                <div class="number">&#43;</div>
                                <div class="card-name">New Stock</div>
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
                    <h3 style={{ color: "#060082", marginLeft: "20px", marginBottom: "10px" }}>Stock Details</h3>
                    <div class="tables">
                        <div class="last-appointments">

                            <table class="appointments">
                                <thead>
                                    <td>Shop Name</td>
                                    <td>Product Name</td>
                                    <td>Quantity</td>
                                    <td>Update</td>

                                </thead>
                                <tbody>
                                    {stock.map((stock) => (
                                        <tr key={stock.idencode}>
                                            <td >{stock.shop.first_name}</td>
                                            <td>{stock.product.name}</td>
                                            <td>{stock.quantity} {findUnit(stock.product.unit)}</td>
                                            <td><div class="input-container">
                                                <input onChange={(e) => {handleChange(e,stock.idencode,stock.quantity)}} name="QValue" type="number" value={quantity.id===stock.idencode?quantity.QValue:""} style={{width:"50px",height:"20px",border:"1px solid black"}} />
                                                <button onClick={handleSubmit} style={{width:"22px",height:"22px",background:"white",fontWeight:"bolder"}}>&#43;</button>
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
                        {newStock && <AddStock setNewStock={setNewStock} />}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StockTable;