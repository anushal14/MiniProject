import React, { useState } from "react";
import { Link,useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { basic_url } from "../../Common/constant";
import axios from "axios";
import './SignUp.css'
function Card() {
    const notify = () => toast.success("Great! Account created Successfully", { position: toast.POSITION.TOP_CENTER, autoClose: 2000 });
    let navigate = useNavigate();
    const [values, setValues] = useState({
        username: "",
        email: "",
        mobile: "",
        card_number: "",
        holder_name: "",
        card_type: "100"
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
            username: values.username,
            email: values.email,
            mobile: values.mobile,
            card_number: values.card_number,
            holder_name:values.holder_name,
            card_type:values.card_type
          }
      
          axios({
            method: 'post',
            url: `${basic_url}/accounts/signup/card/`,
            data: payload,
            headers: {
              // 'Authorization': `bearer ${token}`,
              'Content-Type': 'application/json'
            },
          }).then((response) => {
            console.log(response);
            notify();
            setTimeout(function () {
              navigate(`/`);
            }, 1000);
            setValues(
                {
                    username: "",
                    email: "",
                    mobile: "",
                    card_number: "",
                    holder_name: "",
                    card_type: ""
                }
            )
          }
          )
            .catch((error) => {
              console.log('error', error.response.data)
            })
       
    }
    return (
        <div className="AdminMain">
            <div class="Adminform">
                <center><Link class="link" style={{ textDecoration: 'none' }} to='/signUpShop'><button class="Switch-login">Sign Up as Shop Owner</button></Link></center>
                <div class="line-breaker">
                    <span class="line"></span>
                    <span>or</span>
                    <span class="line"></span>
                </div>
                <h2>Sign Up as Card Holder</h2>
                <input type="text" name="holder_name" placeholder="Holder Name" value={values.holder_name} onChange={handleChange}/>
                <input type="text" name="username" placeholder="UserName" value={values.username} onChange={handleChange} />
                <input type="number" name="mobile" placeholder="Mobile number" value={values.mobile} onChange={handleChange}/>
                <input type="email" name="email" placeholder="Email" value={values.email} onChange={handleChange}/>
                <input type="number" name="card_number" placeholder="Card Number" value={values.card_number} onChange={handleChange}/>
                <select  name="card_type" value={values.card_type} onChange={handleChange}>
                        <option value="100">Yellow</option>
                        <option value="200">Pink</option>
                        <option value="300">White</option>
                        <option value="400">Blue</option>
                    </select>
                <button class="btnn" onClick={handleSubmit}>Register</button>
                <p class="link">Already have an account?<br /><Link to='/'>Sign In</Link> here</p>
            </div>
        </div>
    )
}
export default Card;