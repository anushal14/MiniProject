import React, { useEffect, useState } from "react";
import './Popup.css'
import { basic_url } from "../Common/constant";
import axios from "axios";
function CreatPurchase({ setNewPurchase }) {
    const [tokenDataAvailable, setTokenDataAvailable] = useState([])
    const [minimum, setMinimum] = useState()
    const [tokenDataCurrent, setTokenDataCurrent] = useState([])
    const [error, setError] = useState(false)
    const [values, setValues] = useState({
        token: localStorage.getItem('activeToken'),
        product: "",
        quantity: ""
    });
    useEffect(() => {
        axios({
            method: 'get',
            url: `${basic_url}/supply/token/active/`,
            headers: {
                //  'Authorization': `bearer ${token}`,
                'bearer': localStorage.getItem('bearer'),
                'user-id': localStorage.getItem('user-id'),
                'Content-Type': 'application/json'
            },
        }).then((response) => {
            console.log('current Stock', response.data.shop.current_stock)
            console.log('available Stock', response.data.available)
            setTokenDataAvailable(response.data.available)
            setTokenDataCurrent(response.data.shop.current_stock)
        }
        )
            .catch((error) => {
                console.log('error', error.response.data)

            })

    }, [])

    const findMinQuantity =(e)=>{
        setValues({
            ...values, [e.target.name]: e.target.value
        });
        const curr = tokenDataCurrent.filter(data => {
            return data.product_idencode === e.target.value;
          });
          const avail = tokenDataAvailable.filter(data => {
            return data.idencode === e.target.value;
          });
          if (curr[0].quantity<=avail[0].quantity){
           setMinimum(curr[0].quantity)
          }
          else
          setMinimum(avail[0].quantity)
        
    }
    
    const handleChange = (e) => {
        setValues({
            ...values, [e.target.name]: e.target.value
        });

    }
   

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(values);
        const payload = {
            token: values.token,
            product:values.product,
            quantity:values.quantity
        }
        if(values.quantity>minimum){
            setError(true)
        }
        else{

        axios({
            method: 'post',
            url: `${basic_url}/supply/purchase/`,
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
                    product:"",
                    quantity:""
                }
            )
            setError(false)
        }
        )
            .catch((error) => {
                console.log('error', error.response.data)

            })
        }

    }

    return (

        <div id="popup1" class="overlay">
            <div class="popup">
                <h2>Purchase Products</h2>
                <a class="close" href="#" onClick={() => setNewPurchase(false)}>&times;</a>
                <div class="content">
                    <span style={{ color: "black" }}>Product:</span>
                    <select className="popup-select" name="product" value={values.product} onChange={findMinQuantity}>
                        <option>Select Product</option>
                        {tokenDataAvailable.map((item) => (
                            <option value={item.idencode} key={item.idencode}>{item.name}</option>
                        ))}
                    </select>
                    <span style={{ color: "black" }}>Quantity:</span>
                    <input className="popup-input" type="number" name="quantity" value={values.quantity} onChange={handleChange}/>
                    {error && <span style={{ color: "red" }}>Quantity should be less than or equal to {minimum}</span>}
                    <button className="popup-buttn" onClick={handleSubmit}>Create</button>
                </div>
            </div>
        </div>
    );
}

export default CreatPurchase;
