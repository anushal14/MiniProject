import React, { useEffect, useState } from "react";
import './Popup.css'
import axios from "axios";
import { basic_url } from "../Common/constant";
function CreatToken({ setNewToken }) {
    const [values, setValues] = useState({
        shop: "",
    });
    const [dropdownShop, setDropdownShop] = useState([])
    const [shopStock, setShopStock] = useState([])
    useEffect(() => {
        axios({
            method: 'get',
            url: `${basic_url}/accounts/list/shop/?location=&verified=true&limit=100`,
            headers: {
                //  'Authorization': `bearer ${token}`,
                'bearer': localStorage.getItem('bearer'),
                'user-id': localStorage.getItem('user-id'),
                'Content-Type': 'application/json'
            },
        }).then((response) => {
            console.log('Shop', response)
            setDropdownShop(response.data.results);
           
        }
        )
            .catch((error) => {
                console.log('error', error.response.data)

            })
    }, [])
    const handleChange = (e) => {
        setShopStock([])
        setValues({
            ...values, [e.target.name]: e.target.value
        });
        axios({
            method: 'get',
            url: `${basic_url}/accounts/get/shop/${e.target.value}/`,
            headers: {
                //  'Authorization': `bearer ${token}`,
                'bearer': localStorage.getItem('bearer'),
                'user-id': localStorage.getItem('user-id'),
                'Content-Type': 'application/json'
            },
        }).then((response) => {
            console.log('Shop data', response.data.current_stock)
            setShopStock(response.data.current_stock)
        }
        )
            .catch((error) => {
                console.log('error', error.response)

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

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(values);
        const payload = {
            shop: values.shop,
        }

        axios({
            method: 'post',
            url: `${basic_url}/supply/token/create/`,
            data: payload,
            headers: {
                'bearer': localStorage.getItem('bearer'),
                'user-id': localStorage.getItem('user-id'),
                'Content-Type': 'application/json'
            },
        }).then((response) => {
            console.log(response);
            setValues(
                {
                    shop: "",
                }
            )
        }
        )
            .catch((error) => {
                console.log('error', error.response.data)

            })

    }

    return (

        <div id="popup1" class="overlay">
            <div class="popup">
                <h2>New Token</h2>
                <a class="close" href="#" onClick={() => setNewToken(false)}>&times;</a>
                <div class="content">
                    <span style={{ color: "black" }}>Shop:</span>
                    <select className="popup-select" name="shop" value={values.shop} onChange={handleChange}>
                        <option>Select Shop</option>
                        {dropdownShop.map((shop) => (
                            <option value={shop.idencode} key={shop.idencode}>{shop.first_name}</option>
                        ))}
                    </select>
                    {shopStock.length!==0 && <h5 style={{color:"black",paddingLeft:"5px"}}>Available products in this shop</h5>}
                    {shopStock.map((stock) => (
                        <tr>
                            <td style={{color:"black"}}>{stock.name}</td>
                            <td style={{color:"black"}}>{stock.quantity} {findUnit(stock.unit)}</td>
                        </tr>
                    ))}
                    {shopStock.length!==0 && <p style={{color:"red",paddingLeft:"5px",paddingBottom:"5px"}}>*Some of your ration may not be available in this shop, Please <br/> check before create.</p>}
                    <button className="popup-buttn" onClick={handleSubmit}>Create</button>
                </div>
            </div>
        </div>
    );
}

export default CreatToken;
