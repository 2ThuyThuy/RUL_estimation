import { Line } from 'react-chartjs-2';
import { Pie } from 'react-chartjs-2';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Aside from '../../components/user/Aside/Aside';
import StatusBoard from '../../components/admin/StatusBoard/StatusBoard';
import { options, data } from '../../config/lineChart';
import { barOptions, barData } from '../../config/stackedBarChart';
import { pieData } from '../../config/pieChart';
import Header from '../../components/Header/Header';
import HeaderUser from "../../components/HeaderUser/HeaderUser"



import './userDashboard.scss'

function Convertdate(iosDate){
  let date = new Date(iosDate)
  let year = date.getFullYear();
  let month = date.getMonth()+1;
  let dt = date.getDate();

    if (dt < 10) {
      dt = '0' + dt;
    }
    if (month < 10) {
      month = '0' + month;
    }
  return dt+'/'+month
}




const UserDashboard = () => {
  const navigate = useNavigate();
  const [dataLineChart, setDataLinechart] = useState(null)
  //const [username, setUsername] = useState("thuythuy")
  let userToken = sessionStorage.getItem('token');

  const [dataUser, setDataUser] = useState({
        acc: 96.94,
        day_error: "2023-07-17",
        day_now: "2023-06-17",
        remaining_day: 30,
        unit: 176,
        username: "thuythuy"
  });
  // const [dataUser, setDataUser] = useState(null);

  const get_user = async () => {

    if(userToken === null) {
      console.log("errrrr")
      navigate('/')
      
    }else {
      userToken = userToken.replaceAll('"','')
    }

    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_API_URL}/api/dashboard_client/main_client`,
      headers: { 
        'Authorization': `Bearer ${userToken}`
      }
    };
    
    axios.request(config)
    .then((response) => {
      const res = response.data.data;
      console.log(res)
      setDataUser(res)

      const data_lineChart = {
        labels:res.label_linechart ,
        datasets: [
          {
            "label": "Remaining day",
            "data": res.data_linechart,
            "borderColor": "rgb(54, 162, 235)",
            "backgroundColor": "rgb(54, 162, 235)"
          },
        ],
      }

      setDataLinechart(data_lineChart)

    })
    .catch((error) => {
      console.log(error);
    }); 
  }
  useEffect(() => {
    get_user()
  },[])




  return (
    <div className="user-dashboard">
      <HeaderUser backgroundHeader='#3C6DCD' nameUser={dataUser.username} />
      <Aside />
      <div className="container">
        <div className="line-chart">
        {dataLineChart && <Line options={options} data={dataLineChart} />}
          {/* <Line options={options} data={data} /> */}
        </div>
        <div
          style={{
            marginTop: '20px',
            display: 'flex',
          }}
        >
          <div className="pie-chart">
            <Pie data={pieData} />
          </div>
          <div className="stacked-bar">
            <Bar options={barOptions} data={barData} />
          </div>
        </div>
      </div>

      <div className="report">
        
        <div className="heading">
          <div>Report</div>
          <div className="export" onClick={() => {navigate('/user/report')}} >Export</div>
          {/* <div className="export" onClick={() => {}} >Export</div>
          <Link to="route" target="_blank" rel="noopener noreferrer" />  */}
          {/* <Link to='/user/report' target="_blank" className="export">Export</Link> */}
        </div>
        <div className="title">Estimate Remaining Useful Life</div>
        <div className="number">{dataUser.remaining_day}</div>
        <div className="">Remaining days</div>
        <div className="today">{Convertdate(dataUser.day_error)}</div>
        <div className="reliable_percent">
          <div className="percentage">{dataUser.acc} %</div>
          <div>Reliability</div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
