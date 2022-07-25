import React from "react";
import './Dashboard.css';
import Table from "../Components/Table";
function Dashboard() {
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
                    <li><a href="#" class="nav-item-bottom" id="logoutbtn" ><i class="fa fa-sign-out"></i>  Logout</a></li>
                </ul>
            </nav>

            <div class="main">
                <Table/>
            </div>
      </div>
    );
}

export default Dashboard;