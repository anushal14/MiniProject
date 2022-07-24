import React from "react";
import { Link } from 'react-router-dom';
import './SignUp.css'
function Card() {
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
                <input type="text" name="Card No:" placeholder="Holder Name" />
                <input type="text" name="Card No:" placeholder="UserName" />
                <input type="number" name="Mobile No" placeholder="Mobile number" />
                <input type="email" name="Card No:" placeholder="Email" />
                <input type="number" name="Mobile No" placeholder="Card Number" />
                <input type="text" name="Card No:" placeholder="Card Type" />
                <button class="btnn">Log in</button>
                <p class="link">Already have an account?<br /><Link to='/'>Sign In</Link> here</p>
            </div>
        </div>
    )
}
export default Card;