import React,{useState} from "react";
import './Popup.css'
import axios from "axios";
import { basic_url } from "../Common/constant";

function AddHoliday({ setNewHoliday }) {
    const [holidays,setHolidays]=useState([])
    const [today,setToday]=useState()
    const handleChange = (e) => {
        var dt=new Date(e.target.value)
        const day=dt.getDate()
        setHolidays([...holidays,day])
        setToday(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(holidays);
        console.log(today);
        const payload = {
            holidays: holidays.toString(),
            date: today
          }
      
          axios({
            method: 'post',
            url: `${basic_url}/supply/public/holiday/`,
            data: payload,
            headers: {
                //  'Authorization': `bearer ${token}`,
                'bearer': localStorage.getItem('bearer'),
                'user-id': localStorage.getItem('user-id'),
                'Content-Type': 'application/json'
            },
          }).then((response) => {
            console.log(response);
            setHolidays([])
            setToday();
          }
          )
            .catch((error) => {
              console.log('error', error.response.data)
            //   setError(error.response.data)

            })
        
    }

    return (

        <div id="popup1" class="overlay">
            <div class="popup">
                <h2>Select Holidays</h2>
                <a class="close" href="#" onClick={() => setNewHoliday(false)}>&times;</a>
                <div class="content">
                    <span style={{ color: "black" }}>Date:</span>
                    <input className="popup-input" type="date" name="date"  onChange={handleChange} />
                    {holidays.map(name => <p style={{color:"red"}}>{name}</p>)}
                    {/* {holidays.map((day)=>{
                        <tr><td style={{color:"red"}}>{day}</td></tr>
                    })} */}
                    <button className="popup-buttn" onClick={handleSubmit}>Add</button>
                </div>
            </div>
        </div>
    );
}

export default AddHoliday;
