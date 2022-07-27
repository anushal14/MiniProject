import React, { useEffect, useState } from "react";
import './Popup.css'
import axios from "axios";
function AddStock({ setNewStock }) {
    const [values, setValues] = useState({
        product: "",
        shop: "7WV5a",
        quantity: ""
    });
    const [dropdownProduct, setDropdownProduct] = useState([])
    const [dropdownShop, setDropdownShop] = useState([])
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

            axios({
                method: 'get',
                url: `https://ration-master.herokuapp.com/accounts/list/shop/?location=&verified=true&limit=100`,
                headers: {
                    //  'Authorization': `bearer ${token}`,
                    'bearer': localStorage.getItem('bearer'),
                    'user-id': localStorage.getItem('user-id'),
                    'Content-Type': 'application/json'
                },
            }).then((response) => {
                console.log('Shop', response)
                setDropdownShop(response.data.results);
                setValues({...values,shop:response.data.results[0].idencode})
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
            shop: values.shop,
            quantity: values.quantity
        }

        axios({
            method: 'post',
            url: `https://ration-master.herokuapp.com/supply/stock/`,
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
                    shop: "",
                    quantity:""
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
                <h2>Add Stock</h2>
                <a class="close" href="#" onClick={() => setNewStock(false)}>&times;</a>
                <div class="content">
                    <span style={{ color: "black" }}>Product:</span>
                    <select className="popup-select" name="product" value={values.product} onChange={handleChange}>
                        {dropdownProduct.map((prod)=>(
                            <option value={prod.idencode} key={prod.idencode}>{prod.name}</option>
                        ))}
                    </select>
                    <span style={{ color: "black" }}>Shop:</span>
                    <select className="popup-select" name="shop" value={values.shop} onChange={handleChange}>
                    {dropdownShop.map((shop)=>(
                            <option value={shop.idencode} key={shop.idencode}>{shop.first_name}</option>
                        ))}
                    </select>
                    <span style={{ color: "black" }}>Quantity:</span>
                    <input className="popup-input" type="number" name="quantity" value={values.quantity} onChange={handleChange} />
                    <button className="popup-buttn" onClick={handleSubmit}>Add</button>
                </div>
            </div>
        </div>
    );
}

export default AddStock;
