import React, { useState } from "react";
import DateTimePicker from 'react-datetime-picker';
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import axios from "axios";
import { DatasetController } from "chart.js";

function DatePicker(props) {

    const [startValue, setStartValue] = useState(new Date());
    const [endValue, setEndValue] = useState(new Date());

    const handleClick = async() => {
        const startDate = new Date(startValue.toString());
        const endDate = new Date(endValue.toString());
        const dataSet = props.dataSet;
        let dayDiff = Math.round((endDate - startDate) / (1000 * 60 * 60 * 24));
        if (dayDiff > 30) {
            alert('Maximum number of days search is 30');
            return;
        }
        if (dataSet === "" || dataSet === null) {
            alert('Dataset must be selected');
            return;
        }
        props.updateLoading(true);
        const res = await axios.get(`https://solar-dashboard-nodejs.onrender.com/data`, {
            //http://localhost:3001/data"
            params: {
                start: startDate.getTime()/1000,
                end: endDate.getTime()/1000,
                dataSet: dataSet
            }
        });
        updateParent(res);
        props.updateLoading(false);
    }

    const updateParent = (userData) => {
        props.updateUserData(userData);
    }
    
    return (
        <div className="p-5">
            Start Date: <DateTimePicker onChange={setStartValue} value={startValue}/>&nbsp;&nbsp;
            End Date: <DateTimePicker onChange={setEndValue} value={endValue}/>&nbsp;&nbsp;
            <button onClick={handleClick}>Search</button>
        </div>
    )
}

export default DatePicker