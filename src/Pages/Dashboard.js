import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';
import LogoutDialog from "../Components/LogoutDialogue";
import Table from "../Components/Table";
function Dashboard() {
    let navigate = useNavigate();
    const [dialogue, setDialogue] = useState(false);

    window.history.pushState(null, null, window.location.href);
    window.onpopstate = function (event) {
        window.history.go(1);
    }
    
    const onLogout = () => {
        navigate(`/`);
        localStorage.clear();
    }
    return (
        <div>
            <nav class="sidebar">
                <div class="text">App Name</div>
                <ul>
                    <li><a href="#" class=""><i class="fa fa-home"></i>          Home</a></li>
                    <li><a href="#" class=""><i class="fa fa-newspaper-o"></i>  Feed</a></li>
                    <li><a href="#" class=""><i class="fa fa-th-large"></i>  Items</a></li>
                    <li><a href="#" class=""><i class="fa fa-th"></i>  Sales</a></li>
                    <li><a href="#" class=""><i class="fa fa-user"></i>  Account</a></li>
                    <li><a href="#" class=""><i class="fa fa-gear"></i>  Settings</a></li>
                    <li><a href="#" class=""><i class="fa fa-external-link"></i>  Help</a></li>
                    <li onClick={() => setDialogue(true)}><a href="#" class="nav-item-bottom" id="logoutbtn" ><i class="fa fa-sign-out"></i>  Logout</a></li>
                </ul>
            </nav>

            <div class="main">
                <Table />
            </div>
            {dialogue && <LogoutDialog onDialog={setDialogue} onLogout={onLogout} />}
        </div>
    );
}

export default Dashboard;