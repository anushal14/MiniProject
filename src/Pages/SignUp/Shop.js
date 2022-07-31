import React, { useState } from "react";
import { Link,useNavigate } from 'react-router-dom';
import { basic_url } from "../../Common/constant";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import './SignUp.css'
function Shop() {
    const notify = () => toast.success("Great! Account created Successfully", { position: toast.POSITION.TOP_CENTER, autoClose: 2000 });
    let navigate = useNavigate();
    const [values, setValues] = useState({
        password: "",
        username: "",
        first_name: "",
        last_name: "",
        email: "",
        mobile: "",
        employee_name: "",
        employee_id: "",
        location: ""
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
            password: values.password,
            username: values.username,
            first_name: values.first_name,
            last_name: values.last_name,
            email: values.email,
            mobile: values.mobile,
            employee_name: values.employee_name,
            employee_id: values.employee_id,
            location:values.location 
          }
      
          axios({
            method: 'post',
            url: `${basic_url}/accounts/signup/shop/`,
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
                    password: "",
                    username: "",
                    first_name: "",
                    last_name: "",
                    email: "",
                    mobile: "",
                    employee_name: "",
                    employee_id: "",
                    location: ""
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
                <center><Link class="link" style={{ textDecoration: 'none' }} to='/signUpCard'><button class="Switch-login">Sign Up as Card holder</button></Link></center>
                <div class="line-breaker">
                    <span class="line"></span>
                    <span>or</span>
                    <span class="line"></span>
                </div>
                <h2>Sign Up as Shop Owner </h2>
                <input type="text" name="first_name" placeholder="First Name" value={values.first_name} onChange={handleChange} />
                <input type="text" name="last_name" placeholder="Last Name" value={values.last_name} onChange={handleChange} />
                <input type="text" name="username" placeholder="UserName" value={values.username} onChange={handleChange} />
                <input type="number" name="mobile" placeholder="Mobile number" value={values.mobile} onChange={handleChange} />
                <input type="email" name="email" placeholder="Email" value={values.email} onChange={handleChange} />
                <input type="number" name="employee_id" placeholder="Employee ID" value={values.employee_id} onChange={handleChange} />
                <input type="text" name="employee_name" placeholder="Employee Name" value={values.employee_name} onChange={handleChange} />
                <input type="text" name="location" placeholder="Location" value={values.location} onChange={handleChange} />
                <input type="password" name="password" placeholder="Password" value={values.password} onChange={handleChange} />
                <button class="btnn" onClick={handleSubmit}>Register</button>
                <p class="link">Already have an account?<br /><Link to='/'>Sign In</Link> here</p>
            </div>
        </div>
    )
}
export default Shop;