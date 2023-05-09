import React, { Component, Fragment, useState, useEffect } from 'react';
import {PDFViewer} from '@react-pdf/renderer';
import Invoice from '../../components/reports/Invoice';
import dataReport from '../../config/dataReports';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// class ReportUser extends Component {
//     render() {
//       return (
//           <Fragment>
//               <PDFViewer width="100%" height="1200px" className="app" >
//                   <Invoice invoice={dataReport}/>
//               </PDFViewer>
//           </Fragment>
//       );
//     }
//   }

const ReportUser = () => {

  const navigate = useNavigate();

  //const [username, setUsername] = useState("thuythuy")
  let userToken = sessionStorage.getItem('token');

  // const [reportData, setReportData] = useState(dataReport);
  const [reportData, setReportData] = useState(null);
  // const [dataUser, setDataUser] = useState(null);

  const get_data = async () => {

    if(userToken === null) {
      console.log("errrrr")
      navigate('/')
      
    }else {
      userToken = userToken.replaceAll('"','')
    }

    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_API_URL}/api/dashboard_client/report_client`,
      headers: { 
        'Authorization': `Bearer ${userToken}`
      }
    };
    
    axios.request(config)
    .then((response) => {
      const res = response.data;
      console.log(res.data)
      setReportData(res.data)

    })
    .catch((error) => {
      console.log(error);
    });
    
  }
  
  useEffect(() => {
    get_data()
  },[])

  return (
        <Fragment>
        {reportData&&
          <PDFViewer width="100%" height="1200px" className="app" >
            <Invoice invoice={reportData}/>
          </PDFViewer>
        }
      </Fragment>
  );
};


export default ReportUser;