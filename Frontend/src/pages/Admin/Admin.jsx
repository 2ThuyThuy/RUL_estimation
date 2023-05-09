import { Line } from 'react-chartjs-2';
import { Pie } from 'react-chartjs-2';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import React, { useEffect, useMemo, useState } from "react";
import Aside from '../../components/admin/Aside/Aside';
import StatusBoard from '../../components/admin/StatusBoard/StatusBoard';
import { options, data } from '../../config/lineChart';
import { pieData } from '../../config/pieChart';
import Header from '../../components/Header/Header';
import HeaderUser from '../../components/HeaderUser/HeaderUser'



import './admin.scss';

function ConvertDate(iosDate){
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
  return dt+'/'+month +'/'+year
}


const Admin = () => {

  const [dataPie, setDataPie] = useState(null);
  const [dataLineChart, setDataLinechart] = useState(null)
  const [customers, setCustomers] = useState(0);
  const [products, SetProducts] = useState(0);
  const [daynow, setDaynow] = useState("___");
  const [dateText, setDateText] = useState(1)

  const navigate = useNavigate();
  let userToken = sessionStorage.getItem('token');

  const handleChange = event => {
    setDateText(parseInt(event.target.value));
  };


  const prev = async () => {
    let data = JSON.stringify({
      "days": parseInt(dateText)
    });
    let config = {
      method: 'put',
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_API_URL}/api/dashboard_admin/dec_day`,
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data
    };
    axios.request(config)
    .then((response) => {
      const res=response.data.data
      setDaynow(ConvertDate(res.date_now))
    })
    .catch((error) => {
      console.log(error);
    });
  }
  const next = async () => {
    let data = JSON.stringify({
      "days": parseInt(dateText)
    });
    let config = {
      method: 'put',
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_API_URL}/api/dashboard_admin/inc_day`,
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data
    };
    
    axios.request(config)
    .then((response) => {
      const res=response.data.data
      setDaynow(ConvertDate(res.date_now))
      
    })
    .catch((error) => {
      console.log(error);
    });
  }

  const callLineChart = async() => {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_API_URL}/api/dashboard_admin/linechart_admin`,
      headers: {
        'Content-Type': 'application/json'
       }
    };
    axios.request(config)
    .then((response) => {
      const res = response.data.data
      //console.log(res)
  
      const data_lineChart = {
        labels:res.labels ,
        datasets: [
          {
            "label": "good",
            "data": res.data_good,
            "borderColor": "rgb(54, 162, 235)",
            "backgroundColor": "rgb(54, 162, 235)"
          },
          {
            "label": "observe",
            "data": res.data_observe,
            "borderColor": "rgb(255, 205, 86)",
            "backgroundColor": "rgb(255, 205, 86)"
          },
          {
            "label": "warning",
            "data": res.data_warning,
            "borderColor": "rgb(236, 147, 44)",
            "backgroundColor": "rgb(236, 147, 44)"
          },
          {
            "label": "error",
            "data": res.data_error,
            "borderColor": "rgb(187, 10, 33)",
            "backgroundColor": "rgb(187, 10, 33)"
          }
        ],
      }

      setDataLinechart(data_lineChart)

    })
    .catch((error) => {
      console.log(error);
    });
  }

  const info_main = async () => {
    if(userToken === null) {
      console.log("errrrr")
      navigate('/')
      
    }else {
      userToken = userToken.replaceAll('"','')
    }

      let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `${process.env.REACT_APP_API_URL}/api/dashboard_admin/main_admin`,
        headers: { 
          'Authorization': `Bearer ${userToken}`
        }
      };
      axios.request(config)
      .then((response) => {
        const res = response.data.data
        //console.log(res);
        
        setDaynow(ConvertDate(res.day_now))
        setCustomers(res.nums_clients)
        SetProducts(res.nums_machine)
      })
      .catch((error) => {
        console.log(error);
      });
  }
  const callApi = async () => {
      let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `${process.env.REACT_APP_API_URL}/api/dashboard_admin/admin_pie`,
        headers: { }
      };
      axios.request(config)
      .then((response) => {
        const res = response.data.data.datasets
        // console.log(res);
        const list_pie = {
          labels:  ['good', 'observe', 'warning', 'error'],
          datasets: [
            {
              label: '#',
              data: res,
              backgroundColor: [
                    'rgb(54, 162, 235)',
                    'rgb(255, 205, 86)',
                    'rgb(236, 147, 44)',
                    'rgb(187, 10, 33)'
              ],
              hoverOffset: 4,
            },
          ],
        }
        setDataPie(list_pie)
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {

        callApi()
        callLineChart()
        info_main()
        // console.log('dataPie',dataPie)
    },[])

  const change_dec=() => {
    prev();
    callApi();
    callLineChart();
  }


  const change_inc=() => {
    next();
    callApi();
    callLineChart();
  }
  
  

    

  return (
    <div className="admin-dashboard">
      {/* <Header /> */}
      <HeaderUser backgroundHeader='#3C6DCD' />
      <Aside />
      <div className="container">
        <div>
          <div className="status-bar">
            <StatusBoard number={customers} title={'Customers'} icon="customers" />
            <StatusBoard number={products} title={'Products'} icon="products" />
          </div>
        
          <div className="line-chart">
          {dataLineChart && <Line options={options} data={dataLineChart} />}
          </div>
        </div>
        <div className="pie-chart">
        {dataPie&& <Pie data={dataPie} />}
        {/* <Pie data={pieData} /> */}
        </div>
        <div className="date-now">
          <div>Day now</div>
          <div className="date">{daynow}</div>
          <div className="date-control">
            <div className="prev" onClick={change_dec} ></div>
            <input type="text" placeholder='1' id="textDate" onChange={handleChange} />
            <div className="next" onClick={change_inc}></div>
          </div>  
        </div>
      </div>
      
    </div>
  );
};

export default Admin;