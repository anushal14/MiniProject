import React, { useState } from "react";
import { Link,Navigate } from 'react-router-dom';
import axios from "axios";
import './Login.css'
function CardLogin() {
    const [otp, setOtp] = useState(false);
    const [responseData, setResponseData] = useState({})
    const [error,setError]=useState("")
    const [values, setValues] = useState({
        card_number: "",
        otp: ""
    });
    const handleChange = (e) => {
        setError("")
        setValues({
            ...values, [e.target.name]: e.target.value
        });
    }
    window.history.pushState(null, null, window.location.href);
    window.onpopstate = function (event) {
        window.history.go(1);
    }
    const getOtp = (e) => {
        e.preventDefault();
       console.log(values)
        axios({
            method: 'get',
            url: `https://ration-master.herokuapp.com/accounts/login/create/otp/?card_number=${values.card_number}`
        }).then((response) => {
            console.log(response);
            setOtp(true);
        }
        )
            .catch((error) => {
                console.log('error', error)
                setError(error.response.data)
            })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(values);
        const payload = {
            card_number: values.card_number,
            otp: values.otp
          }
      
          axios({
            method: 'post',
            url: `https://ration-master.herokuapp.com/accounts/login/otp/`,
            data: payload,
            headers: {
              // 'Authorization': `bearer ${token}`,
              'Content-Type': 'application/json'
            },
          }).then((response) => {
            console.log(response);
            localStorage.setItem('bearer', response.data.bearer);
            localStorage.setItem('user-id', response.data.idencode);
            localStorage.setItem('cardNo', response.data.name);
            localStorage.setItem('cardType', response.data.type);
            setResponseData(response.data);
            setOtp(false);
            setValues(
                {
                    card_number: "",
                    otp: ""
                }
            )
          }
          )
            .catch((error) => {
              console.log('error', error.response.data)
              setError(error.response.data)

            })
        
    }
    if (responseData.bearer && responseData.type===300) {
        return <div>
          <Navigate to='/CardDashboard' />
        </div>
      }
    return (
        <div class="Homemain">
            <div class="navbar">
                <div class="icon">
                    <h2 class="logo">VQRation</h2>
                </div>

                <div class="menu">
                    <ul className="HomeUl">
                        <li className='HomeLi'><a href="#">HOME</a></li>
                        <li className='HomeLi'><a href="#">SUPPLYCCO</a></li>
                        <li className='HomeLi'><a href="#">RATIONSHOP</a></li>
                        <li className='HomeLi'><a href="#">CONTACT</a></li>
                    </ul>
                </div>

            </div>
            <div class="content">
                <h1>MY RATION <br /><span className="MidHead">MY RIGHT</span> <br /></h1>
                <p class="par">The belly rules the mind</p>

                <div class="Homeform">

                    <Link class="link" style={{ textDecoration: 'none' }} to='/'><button class="Switch-login">Log in as Shop Owner</button></Link>
                    <div class="line-breaker">
                        <span class="line"></span>
                        <span>or</span>
                        <span class="line"></span>
                    </div>
                    <h2>Login as Card Holder</h2>
                    <input type="text" name="card_number" placeholder="Ration card number" value={values.card_number} onChange={handleChange} />
                    
                    {!otp && <button class="btnn" onClick={getOtp}>Get OTP</button>}
                    {otp && <><input type="number" name="otp" placeholder="Enter OTP" value={values.otp} onChange={handleChange} />
                    <span style={{ color: "red"}}>{error.otp}</span>
                        <button class="btnn" onClick={handleSubmit}>Log in</button></>}
                        <center><span style={{ color: "red"}}>{error.detail}</span></center>
                    <p class="link">Don't have an account?<br /><Link to='/signupShop'>Sign Up</Link> here</p>
                </div>
            </div>
        </div>
    );
}

export default CardLogin;