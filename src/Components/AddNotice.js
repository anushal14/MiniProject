import React, { useState } from "react";
import './Popup.css'
import axios from "axios";
function AddNotice({ setNewNotice }) {
    const [values, setValues] = useState({
        content: "",
        type: "200",
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
            content: values.name,
            type: values.age,
          
        }

        axios({
            method: 'post',
            url: `https://ration-master.herokuapp.com/supply/notification/`,
            data: payload,
            headers: {
                //  'Authorization': `bearer ${token}`,
                'bearer': localStorage.getItem('bearer'),
                'user-id': localStorage.getItem('user-id'),
                'Content-Type': 'application/json'
            },
        }).then((response) => {
            console.log("memberAdded", response);
            setValues(
                {
                    content: "",
                    type: "",
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
                <h2>Add Notification</h2>
                <a class="close" href="#" onClick={() => setNewNotice(false)}>&times;</a>
                <div class="content">
                    <span style={{ color: "black" }}>Content:</span>
                    <input className="popup-input" type="text" name="content" value={values.content} onChange={handleChange} />
                    <span style={{ color: "black" }}>User Type:</span>
                    <select className="popup-select" name="type" value={values.type} onChange={handleChange}>
                        <option value="200">Shop</option>
                        <option value="300">Card</option>
                    </select>
                    <button className="popup-buttn" onClick={handleSubmit}>Add</button>
                </div>
            </div>
        </div>
    );
}

export default AddNotice;
