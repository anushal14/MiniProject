import React, { useState } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import './Login.css'
function CardLogin() {
    const [otp, setOtp] = useState(false)
    const [values, setValues] = useState({
        card_number: "",
        otp: ""
    });
    const handleChange = (e) => {
        setValues({
            ...values, [e.target.name]: e.target.value
        });
    }
    const getOtp = (e) => {
       
        axios({
            method: 'get',
            url: `https://ration-master.herokuapp.com/accounts/login/create/otp/?card_number=9876543219"`
        }).then((response) => {
            console.log(response);
            setOtp(true);
        }
        )
            .catch((error) => {
                console.log('error', error)
            })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(values);
        setValues(
            {
                card_number: "",
                otp: ""
            }
        )
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
                        <button class="btnn" onClick={handleSubmit}>Log in</button></>}
                    <p class="link">Don't have an account?<br /><Link to='/signupShop'>Sign Up</Link> here</p>
                </div>
            </div>
        </div>
    );
}

export default CardLogin;