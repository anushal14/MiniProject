import React, { useEffect, useState } from "react";
import './Popup.css'
import axios from "axios";
function ShowNotification({ setNotification }) {
    const [notificationData, setNotificationData] = useState([])
    useEffect(() => {
        axios({
            method: 'get',
            url: `https://ration-master.herokuapp.com/supply/notification/`,
            headers: {
                //  'Authorization': `bearer ${token}`,
                'bearer': localStorage.getItem('bearer'),
                'user-id': localStorage.getItem('user-id'),
                'Content-Type': 'application/json'
            },
        }).then((response) => {
            console.log('notification', response.data.results)
            setNotificationData(response.data.results)
        }
        )
            .catch((error) => {
                console.log('error', error.response.data)

            })

    }, [])


    return (

        <div id="popup1" class="overlay">
            {/* <div class="popup">
                <h2>Notifications</h2>
                <a class="close" href="#" onClick={() => setNotification(false)}>&times;</a>
                <div class="content">
                    <table>
                    {notificationData.map((notice)=>
                    <tr style={{width:"30px"}}><td style={{width:"30px"}}><span  style={{color:"black",fontSize:"25px"}}>&#8226;</span><span style={{color:"blue"}}> {notice.content}</span></td></tr>)}
                    </table>
                </div>
            </div> */}
<div class="popup">
<h2>Notifications</h2>
                <a class="close" href="#" onClick={() => setNotification(false)}>&times;</a>
                    {/* <div class="Sidecard" > */}
                        
                        <div class="card-body">
                            
                            
                            <div >
                                
                                <table class="appointments">
                                <tbody>
                                {notificationData.map((notice)=> (
                        <tr key={notice.content}>
                            <td style={{color:"blue",fontWeight:"600",cursor:"pointer",background:"white"}}><span  style={{color:"black",fontSize:"25px"}}>&#8226; </span>{notice.content}</td>
                        </tr>
                    ))}

                                </tbody>
                            
                            </table>
                            </div>
                           
                        </div>
                        
                    </div>
                    {/* </div> */}

        </div>
    );
}

export default ShowNotification;
