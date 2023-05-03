import axios from 'axios';
import React, { useState, useEffect } from 'react';
import HeaderUser from '../../components/HeaderUser/HeaderUser'
import Aside from '../../components/admin/Aside/Aside';
import './adminDataRaw.scss';
import DataTable from 'react-data-table-component';

const rawdata_columns = [
  {
    name: 'Unit',
    selector: (row) => row.Unit,
    maxWidth: '20px',
    sortable: true,
  },
  {
    name: 'Max_Timestep',
    selector: (row) => row.Max_Timestep,
    Width: '30px',
    sortable: true,
  },
  {
    name: 'Min_Timestamp',
    selector: (row) => row.Min_Timestamp,
    Width: '30px',
    sortable: true,
  },
  {
    name: 'Max_Timestamp',
    selector: (row) => row.Max_Timestamp,
    Width: '30px',
    sortable: true,
  }
];

const data = [
  {
    Unit: 1,
    Max_Timestep: 1,
    Min_Timestamp: 0.0005,
    Max_Timestamp: 0,
  },
  {
    Unit: 2,
    Max_Timestep: 1,
    Min_Timestamp: 0.0005,
    Max_Timestamp: 0,
  },
];

const AdminDataRaw = () => {

  const [dataTableRaw, setDataTableRaw] = useState(data);

  
  const get_table_groupby = async () => {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_API_URL}/api/dashboard_admin/admin_dataraw`,
      headers: { 'Content-Type': 'application/json'}
    };
    
    axios.request(config)
    .then((response) => {
      setDataTableRaw(response.data.data)
    })
    .catch((error) => {
      console.log(error);
    });
  }
  
  useEffect(() => {
      get_table_groupby()
  },[])


  return (
    <div className="table-dashboard">
      <HeaderUser backgroundHeader='#3C6DCD' />
      <Aside />
      
      <div className="container">
        <div className="data-table">
          <DataTable
            striped
            responsive
            pagination
            title="Data raw group by each unit"
            columns={rawdata_columns}
            data={dataTableRaw}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminDataRaw;
