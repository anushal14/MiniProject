import React, { useState } from "react";
import './Popup.css'
import axios from "axios";
function AddMember({ setNewMember }) {
    const [values, setValues] = useState({
        name: "",
        age: "",
        age_group: "",
        occupation: "",
        gender: "100"
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
            age: values.age,
            age_group: values.age<=18?"200":"100",
            occupation: values.occupation,
            gender: values.gender
        }

        axios({
            method: 'post',
            url: `https://ration-master.herokuapp.com/accounts/member/`,
            data: payload,
            headers: {
                //  'Authorization': `bearer ${token}`,
                'bearer': localStorage.getItem('bearer'),
                'user-id': localStorage.getItem('user-id'),
                'Content-Type': 'application/json'
            },
        }).then((response) => {
            console.log("memberAdded",response);
            setValues(
                {
                    name: "",
                    age: "",
                    age_group: "",
                    occupation: "",
                    gender: "100"
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
                <a class="close" href="#" onClick={() => setNewMember(false)}>&times;</a>
                <div class="content">
                    <span style={{ color: "black" }}>Name:</span>
                    <input className="popup-input" type="text" name="name" value={values.name} onChange={handleChange} />
                    <span style={{ color: "black" }}>Age:</span>
                    <input className="popup-input" type="number" name="age" value={values.age} onChange={handleChange} />
                    {/* <span style={{ color: "black" }}>Age Group:</span>
                    <select className="popup-select" name="age_group" value={values.age_group} onChange={handleChange}>
                        <option value="100">Adult</option>
                        <option value="200">Child</option>
                    </select> */}
                    <span style={{ color: "black" }}>occupation:</span>
                    <input className="popup-input" type="text" name="occupation" value={values.occupation} onChange={handleChange} />
                    <span style={{ color: "black" }}>Gender:</span>
                    <select className="popup-select" name="gender" value={values.gender} onChange={handleChange}>
                        <option value="100">Male</option>
                        <option value="200">Female</option>
                        <option value="300">Others</option>
                    </select>
                    <button className="popup-buttn" onClick={handleSubmit}>Add</button>
                </div>
            </div>
        </div>
    );
}

export default AddMember;
