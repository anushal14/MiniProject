import React from "react";
import { Link } from 'react-router-dom';
import './SignUp.css'
function Admin() {
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
                <input type="text" name="Card No:" placeholder="First Name" />
                <input type="text" name="Mobile No" placeholder="Last Name" />
                <input type="text" name="Card No:" placeholder="UserName" />
                <input type="number" name="Mobile No" placeholder="Mobile number" />
                <input type="email" name="Card No:" placeholder="Email" />
                <input type="number" name="Mobile No" placeholder="Employee ID" />
                <input type="text" name="Card No:" placeholder="Employee Name" />
                <input type="text" name="Mobile No" placeholder="Location" />
                <input type="password" name="" placeholder="Password" />
                <button class="btnn">Log in</button>
                <p class="link">Already have an account?<br /><Link to='/'>Sign In</Link> here</p>
            </div>
        </div>
    )
}
export default Admin;