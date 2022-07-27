import React,{useState} from "react";
import './Popup.css'
import axios from "axios";
function AddProduct({ setNewProduct }) {
    const [values, setValues] = useState({
        name: "",
        unit: "100"
    });
    const handleChange = (e) => {
        setValues({
            ...values, [e.target.name]: e.target.value
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(values);
        const payload = {
            name: values.name,
            unit: values.unit
          }
      
          axios({
            method: 'post',
            url: `https://ration-master.herokuapp.com/supply/products/`,
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
                    name: "",
                    unit: ""
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
                <h2>Add Product</h2>
                <a class="close" href="#" onClick={() => setNewProduct(false)}>&times;</a>
                <div class="content">
                    <span style={{ color: "black" }}>Product Name:</span>
                    <input className="popup-input" type="text" name="name" value={values.name} onChange={handleChange} />
                    <span style={{ color: "black" }}>Unit:</span>
                    <select className="popup-select" name="unit" value={values.unit} onChange={handleChange}>
                        <option value="100">Kilo Gram</option>
                        <option value="200">Litre</option>
                        <option value="300">Pack</option>
                    </select>
                    <button className="popup-buttn" onClick={handleSubmit}>Add</button>
                </div>
            </div>
        </div>
    );
}

export default AddProduct;
