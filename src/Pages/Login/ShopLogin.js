import React,{useState} from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Login.css'
function ShopLogin() {
    const [values, setValues] = useState({
        username: "",
        password: ""
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
            password: values.password
          }
      
          axios({
            method: 'post',
            url: `https://ration-master.herokuapp.com/accounts/login/`,
            data: payload,
            headers: {
              // 'Authorization': `bearer ${token}`,
              'Content-Type': 'application/json'
            },
          }).then((response) => {
            console.log(response);
            localStorage.setItem('bearer', response.data.bearer);
            localStorage.setItem('user-id', response.data.idencode);
            setValues(
                {
                    password: "",
                    username: "",
                }
            )
          }
          )
            .catch((error) => {
              console.log('error', error.response.data)
            })
       
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

                    <Link class="link" style={{ textDecoration: 'none' }} to='/CardLogin'><button class="Switch-login">Log in as Card holder</button></Link>
                    <div class="line-breaker">
                        <span class="line"></span>
                        <span>or</span>
                        <span class="line"></span>
                    </div>
                    <h2>Login as Shop Owner</h2>
                    <input type="text" name="username" placeholder="User Name" value={values.username} onChange={handleChange}/>
                    <input type="password" name="password" placeholder="Password" value={values.password} onChange={handleChange} />
                    <button class="btnn" onClick={handleSubmit}>Log in</button>
                    <p class="link">Don't have an account?<br /><Link to='/signupShop'>Sign Up</Link> here</p>
                </div>
            </div>
        </div>
    );
}

export default ShopLogin;