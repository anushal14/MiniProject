import React, { useEffect, useState } from "react";
import './Table.css';
import axios from "axios";
function Table() {
    const [shop,setShop]=useState([])
    useEffect(() => {
        axios({
            method: 'get',
            url: `https://ration-master.herokuapp.com/accounts/signup/shop/?location=&verified=`,
            headers: {
                //  'Authorization': `bearer ${token}`,
                'bearer': localStorage.getItem('bearer'),
                'user-id': localStorage.getItem('user-id'),
                'Content-Type': 'application/json'
            },
        }).then((response) => {
            console.log('shopData', response)
            setShop(response.data.results);
        }
        )
            .catch((error) => {
                console.log('error', error.response.data)

            })
    }, [])

    const ShopVerify=(id)=>{
        axios({
            method: 'patch',
            url: `https://ration-master.herokuapp.com/accounts/verify/shop/${id}/`,
            headers: {
                //  'Authorization': `bearer ${token}`,
                'bearer': localStorage.getItem('bearer'),
                'user-id': localStorage.getItem('user-id'),
                'Content-Type': 'application/json'
            },
        }).then((response) => {
            console.log('shopData', response)
        }
        )
            .catch((error) => {
                console.log('error', error.response.data)

            })
    }
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
            <th></th>
            <th></th>
            
        </tr>
        </thead>
        
        <tbody>
        {shop.map((shop) => (
             <tr key={shop.idencode}>
             <td >{shop.first_name}</td>
             <td>{shop.location}</td>
             <td >{shop.employee_name}</td>
             <td >{shop.employee_id}</td>
             <td >{shop.email}</td>
             <td >{shop.mobile}</td>
             <td onClick={()=>ShopVerify(shop.idencode)}><span>&#9989;</span></td>
             <td><span>&#10060;</span></td>
             
         </tr>
            ))}
        
        </tbody>
        
    </table>

        </div>
    );
}

export default Table;