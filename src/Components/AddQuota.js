import React, { useEffect, useState } from "react";
import './Popup.css'
import axios from "axios";
function AddQuota({ setNewQuota }) {
    const [values, setValues] = useState({
        product: "",
        card_type: "100",
        age_group:"100",
        quantity: "",
        date:""
    });
    const [dropdownProduct, setDropdownProduct] = useState([])
    useEffect(()=>{
        axios({
            method: 'get',
            url: `https://ration-master.herokuapp.com/supply/products/?limit=100`,
            headers: {
                //  'Authorization': `bearer ${token}`,
                'bearer': localStorage.getItem('bearer'),
                'user-id': localStorage.getItem('user-id'),
                'Content-Type': 'application/json'
            },
        }).then((response) => {
            console.log('Product', response)
            setDropdownProduct(response.data.results);
            setValues({...values,product:response.data.results[0].idencode})
        }
        )
            .catch((error) => {
                console.log('error', error.response.data)

            })
    },[])
    const handleChange = (e) => {
        setValues({
            ...values, [e.target.name]: e.target.value
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(values);
        const payload = {
            product: values.product,
            card_type: values.card_type,
            age_group:values.age_group,
            quantity: values.quantity,
            date:values.date
        }

        axios({
            method: 'post',
            url: `https://ration-master.herokuapp.com/supply/quota/`,
            data: payload,
            headers: {
                //  'Authorization': `bearer ${token}`,
                'bearer': localStorage.getItem('bearer'),
                'user-id': localStorage.getItem('user-id'),
                'Content-Type': 'application/json'
            },
        }).then((response) => {
            console.log(response);
            setValues(
                {
                    product: "",
                    card_type: "100",
                    age_group:"100",
                    quantity: "",
                    date:""
                }
            )
        }
        )
            .catch((error) => {
                console.log('error', error.response.data)
                //   setError(error.response.data)

            })

    }

    return (

        <div id="popup1" class="overlay">
            <div class="popup">
                <h2>Add Ration</h2>
                <a class="close" href="#" onClick={() => setNewQuota(false)}>&times;</a>
                <div class="content">
                    <span style={{ color: "black" }}>Product:</span>
                    <select className="popup-select" name="product" value={values.product} onChange={handleChange}>
                        {dropdownProduct.map((prod)=>(
                            <option value={prod.idencode} key={prod.idencode}>{prod.name}</option>
                        ))}
                    </select>
                    <span style={{ color: "black" }}>Card Type:</span>
                    <select className="popup-select" name="card_type" value={values.card_type} onChange={handleChange}>
                            <option value="100">Yellow</option>
                            <option value="200">Pink</option>
                            <option value="300">White</option>
                            <option value="400">Blue</option>
                    </select>
                    <span style={{ color: "black" }}>Age Group:</span>
                    <select className="popup-select" name="age_group" value={values.age_group} onChange={handleChange}>
                            <option value="100">Adult</option>
                            <option value="200">Child</option>
                    </select>
                    <span style={{ color: "black" }}>Quantity:</span>
                    <input className="popup-input" type="number" name="quantity" value={values.quantity} onChange={handleChange} />
                    <span style={{ color: "black" }}>Quantity:</span>
                    <input className="popup-input" type="date" name="date" value={values.date} onChange={handleChange} />
                    <button className="popup-buttn" onClick={handleSubmit}>Add</button>
                </div>
            </div>
        </div>
    );
}

export default AddQuota;
