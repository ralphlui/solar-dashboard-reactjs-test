import { useEffect, useState } from 'react';
import './App.css';
import LineChart from './components/LineChart';
//import {UserData} from './Data';
import axios from 'axios';
import DatePicker from './components/DatePicker';
import LocationPicker from './components/LocationPicker';

function App() {

  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dataSet, setDataSet] = useState('UsersData');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async() => {
    setLoading(true);
    const options = {
        method: 'GET',
        url: `https://solar-dashboard-nodejs.onrender.com`,
        params: {
          dataSet: dataSet
        }
        //http://localhost:3001
    };
  
    const res = await axios.request(options);
    updateUserData(res);
    setLoading(false);
  };

  const updateUserData = (userData) => {
    const resValues = userData.data ? Object.values(userData.data) : null;
    const resKeys = userData.data ? Object.keys(userData.data) : null;
    const label = resKeys ? resKeys.map((keys) => {
      let timestamp = parseInt(keys);
      let date = new Date(timestamp * 1000);
      let dateTime = date.getFullYear() + "-" + ("0" + (date.getMonth() + 1)).slice(-2) + "-" + date.getDate() + " " + date.getHours() + ":" + ("0" + date.getMinutes()).slice(-2)
      + ":" + ("0" + date.getSeconds()).slice(-2);
      return dateTime;
    }) : null;
    setUserData([
      {
        labels: label,
        datasets: [
          {
            label: 'Battery Current',
            data: resValues ? resValues.map((data) => data.battery_current) : null,
            borderColor: 'rgb(255, 99, 132)',
            borderWidth: 2,
            fill: {
              target: 'origin',
              above: 'rgba(255, 0, 0, 0.1)'
            },
            backgroundColor: 'rgba(255, 0, 0)'
          }
        ]
      },
      {
        labels: label,
        datasets: [
          {
            label: 'Battery Soc',
            data: resValues ? resValues.map((data) => data.battery_soc) : null,
            borderColor: 'rgb(53, 162, 235)',
            borderWidth: 2,
            fill: {
              target: 'origin',
            },
            backgroundColor: 'rgba(53, 162, 235, 0.4)'
          }
        ]
      },
      {
        labels: label,
        datasets: [
          {
            label: 'Battery Voltage',
            data: resValues ? resValues.map((data) => data.battery_voltage) : null,
            borderColor: 'rgb(39, 236, 15)',
            borderWidth: 2,
            fill: {
              target: 'origin',
            },
            backgroundColor: 'rgba(115, 255, 102, 0.58)'
          }
        ]
      },
      {
        labels: label,
        datasets: [
          {
            label: 'Load Current',
            data: resValues ? resValues.map((data) => data.load_current) : null,
            borderColor: 'rgb(142, 68, 173)',
            borderWidth: 2,
            fill: {
              target: 'origin',
            },
            backgroundColor: 'rgba(120, 3, 248, 0.37)'
          }
        ]
      },
      {
        labels: label,
        datasets: [
          {
            label: 'Load Voltage',
            data: resValues ? resValues.map((data) => data.load_voltage) : null,
            borderColor: 'rgb(39, 55, 70)',
            borderWidth: 2,
            fill: {
              target: 'origin',
            },
            backgroundColor: 'rgba(83, 77, 89, 0.65)'
          }
        ]
      },
      {
        labels: label,
        datasets: [
          {
            label: 'PV Current',
            data: resValues ? resValues.map((data) => data.pv_current) : null,
            borderColor: 'rgb(186, 74, 0)',
            borderWidth: 2,
            fill: {
              target: 'origin',
            },
            backgroundColor: 'rgba(255, 85, 0, 0.55)'
          }
        ]
      },
      {
        labels: label,
        datasets: [
          {
            label: 'PV Voltage',
            data: resValues ? resValues.map((data) => data.pv_voltage) : null,
            borderColor: 'rgb(222, 49, 99)',
            borderWidth: 2,
            fill: {
              target: 'origin',
            },
            backgroundColor: 'rgba(227, 0, 109, 0.49)'
          }
        ]
      }
    ]);
  };

  return (
    <div className="App">
      <div style={{textAlign:"left", marginLeft:"10px"}}>
        <LocationPicker updateDataSet={setDataSet} dataSet={dataSet}/>
        <DatePicker updateUserData={updateUserData} updateLoading={setLoading} dataSet={dataSet}/>
      </div><br/>
      <div style={{width:"85%"}}>
        {loading && (
        <div style={{position:"fixed", left:"50%"}}><img src="/Loading_2.gif" atl="image" height="40px"/></div>
        )}
        {userData ?
        <LineChart chartData={userData} />
        : <p>Loading ... </p>
        }
      </div>
    </div>
  );
}

export default App;
