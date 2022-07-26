import React, { useState, useEffect } from "react";
import LogoutDialog from "./LogoutDialogue";
import { useNavigate } from 'react-router-dom';
function Sidebar() {
    let navigate = useNavigate();
    const [dialogue, setDialogue] = useState(false);

    const onLogout = () => {
        navigate(`/`);
        localStorage.clear();
    }

    return (
        <div class="sidebar">
            <ul>
                <li>
                    <a href="">
                        <i class="fas fa-clinic-medical"></i>
                        <div class="title">VQ Ration</div>
                    </a>
                </li>
                <li>
                    <a href="">
                        <i class="fas fa-th-large"></i>
                        <div class="title">Dashboard</div>
                    </a>
                </li>
                <li onClick={()=>navigate(`/CardTable`)}>
                    <a href="">
                        <i class="fas fa-stethoscope"></i>
                        <div class="title">Card</div>
                    </a>
                </li>
                <li onClick={()=>navigate(`/ShopTable`)}>
                    <a href="">
                        <i class="fas fa-user-md"></i>
                        <div class="title">Shop</div>
                    </a>
                </li>
                <li onClick={()=>navigate(`/ProductTable`)}>
                    <a href="">
                        <i class="fas fa-puzzle-piece"></i>
                        <div class="title">Products</div>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <i class="fas fa-hand-holding-usd"></i>
                        <div class="title">Payments</div>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <i class="fas fa-cog"></i>
                        <div class="title">Settings</div>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <i class="fas fa-question"></i>
                        <div class="title">Help</div>
                    </a>
                </li>
                <li style={{ position: "absolute", bottom: "40px" }} onClick={() => setDialogue(true)}>
                    <a href="#">
                        <i class="fas fa-question"></i>
                        <div class="title">Log Out</div>
                    </a>
                </li>
            </ul>
            {dialogue && <LogoutDialog onDialog={setDialogue} onLogout={onLogout} />}
        </div>
    );
}

export default Sidebar;