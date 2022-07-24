import React from "react";
import { Link } from 'react-router-dom';
import './Login.css'
function ShopLogin() {
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

                    <Link class="link" style={{ textDecoration: 'none' }} to='/CardLogin'><button class="Switch-login">Log in as Card holder</button></Link>
                    <div class="line-breaker">
                        <span class="line"></span>
                        <span>or</span>
                        <span class="line"></span>
                    </div>
                    <h2>Login as Shop Owner</h2>
                    <input type="text" name="Card No:" placeholder="User Name" />
                    <input type="password" name="" placeholder="Password" />
                    <button class="btnn">Log in</button>
                    <p class="link">Don't have an account?<br /><Link to='/signupShop'>Sign Up</Link> here</p>
                </div>
            </div>
        </div>
    );
}

export default ShopLogin;