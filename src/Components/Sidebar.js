import React, { useState, useEffect } from "react";
import LogoutDialog from "./LogoutDialogue";
import { useNavigate } from 'react-router-dom';
import AddHoliday from "./AddHoliday";
import AddNotice from "./AddNotice";
function Sidebar() {
    let navigate = useNavigate();
    const [dialogue, setDialogue] = useState(false);
    const [newHoliday, setNewHoliday] = useState(false);
    const [newNotice, setNewNotice] = useState(false);

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
                {/* <li>
                    <a href="">
                        <i class="fas fa-th-large"></i>
                        <div class="title">Dashboard</div>
                    </a>
                </li> */}
              
                <li onClick={()=>navigate(`/ShopTable`)}>
                    <a href="">
                        <i class="fas fa-user-md"></i>
                        <div class="title">Shop</div>
                    </a>
                </li>
                <li onClick={()=>navigate(`/CardTable`)}>
                    <a href="">
                        <i class="fas fa-stethoscope"></i>
                        <div class="title">Card</div>
                    </a>
                </li>
                <li onClick={()=>navigate(`/ProductTable`)}>
                    <a href="">
                        <i class="fas fa-puzzle-piece"></i>
                        <div class="title">Products</div>
                    </a>
                </li>
                <li onClick={()=>navigate(`/StockTable`)}>
                    <a href="#">
                        <i class="fas fa-cog"></i>
                        <div class="title">Stock</div>
                    </a>
                </li>
                <li onClick={()=>navigate(`/QuotaTable`)}>
                    <a href="#">
                        <i class="fas fa-hand-holding-usd"></i>
                        <div class="title">Ration</div>
                    </a>
                </li>
                <li onClick={()=>setNewHoliday(true)}>
                    <a href="#">
                        <i class="fas fa-hand-holding-usd"></i>
                        <div class="title">Holiday</div>
                    </a>
                </li>
                <li onClick={()=>setNewNotice(true)}>
                    <a href="#">
                        <i class="fas fa-hand-holding-usd"></i>
                        <div class="title">Notice</div>
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
            {newHoliday && <AddHoliday setNewHoliday={setNewHoliday}/>}
            {newNotice && <AddNotice setNewNotice={setNewNotice}/>}
        </div>
    );
}

export default Sidebar;