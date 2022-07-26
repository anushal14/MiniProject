import React from "react";
import './Table.css';
function Table() {
    return (
        <div>
           <h1>Admin</h1>
           <br/>
    <table>
        <thead>
        <tr>
            <th>Shop Name</th>
            <th>Location</th>
            <th>Employee Id</th>
            <th>Employee Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Size/Area</th>
            
        </tr>
        </thead>
        <tbody>
        <tr>
            <td >Germany</td>
            <td>Federal Republic of Germany</td>
            <td >German</td>
            <td >Berlin</td>
            <td >Euro@gmail.comsfdsfsdfdswerewtret</td>
            <td >80,854,408</td>
            <td >357,022 sq km</td>
            
        </tr>
        <tr>
            <td >Germany</td>
            <td>Federal Republic of Germany</td>
            <td >German</td>
            <td >Berlin</td>
            <td >Euro</td>
            <td >80,854,408</td>
            <td >357,022 sq km</td>
            
        </tr>
        <tr>
            <td >Germany</td>
            <td>Federal Republic of Germany</td>
            <td >German</td>
            <td >Berlin</td>
            <td >Euro</td>
            <td >80,854,408</td>
            <td >357,022 sq km</td>
            
        </tr>
        </tbody>
    </table>

        </div>
    );
}

export default Table;