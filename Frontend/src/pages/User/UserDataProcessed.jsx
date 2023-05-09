import axios from 'axios';
import React, { useState, useEffect } from 'react';
import HeaderUser from '../../components/HeaderUser/HeaderUser'
import Aside from '../../components/admin/Aside/Aside';
import './userDataProcessed.scss';
import DataTable from 'react-data-table-component';

const rawdata_columns = [
  {
    name: 'Unit',
    selector: (row) => row.Unit,
    maxWidth: '20px',
    sortable: true,
  },
  {
    name: 'Timestamp',
    selector: (row) => row.Timestamp,
    maxWidth: '20px',
    sortable: true,
  },
  {
    name: 'Timestep',
    selector: (row) => row.Timestep,
    maxWidth: '20px',
    sortable: true,
  },
  {
    name: 'op_setting_1',
    selector: (row) => row.op_setting_1,
    maxWidth: '20px',
    sortable: true,
  },
  {
    name: 'op_setting_2',
    selector: (row) => row.op_setting_2,
    maxWidth: '20px',
    sortable: true,
  },
  {
    name: 'op_setting_3',
    selector: (row) => row.op_setting_3,
    maxWidth: '20px',
    sortable: true,
  },
  {
    name: 'sensor_1',
    selector: (row) => row.sensor_1,
    maxWidth: '20px',
    sortable: true,
  },
  {
    name: 'sensor_2',
    selector: (row) => row.sensor_2,
    maxWidth: '20px',
    sortable: true,
  } ,
  {
    name: 'sensor_3',
    selector: (row) => row.sensor_3,
    maxWidth: '20px',
    sortable: true,
  } ,
  {
    name: 'sensor_4',
    selector: (row) => row.sensor_4,
    maxWidth: '20px',
    sortable: true,
  } ,
  {
    name: 'sensor_5',
    selector: (row) => row.sensor_5,
    maxWidth: '20px',
    sortable: true,
  },
  {
    name: 'sensor_6',
    selector: (row) => row.sensor_6,
    maxWidth: '20px',
    sortable: true,
  },
  {
    name: 'sensor_7',
    selector: (row) => row.sensor_7,
    maxWidth: '20px',
    sortable: true,
  } ,
  {
    name: 'sensor_8',
    selector: (row) => row.sensor_8,
    maxWidth: '20px',
    sortable: true,
  } ,
  {
    name: 'sensor_9',
    selector: (row) => row.sensor_9,
    maxWidth: '20px',
    sortable: true,
  } ,
  {
    name: 'sensor_10',
    selector: (row) => row.sensor_10,
    maxWidth: '20px',
    sortable: true,
  },
  {
    name: 'sensor_11',
    selector: (row) => row.sensor_11,
    maxWidth: '20px',
    sortable: true,
  },
  {
    name: 'sensor_12',
    selector: (row) => row.sensor_12,
    maxWidth: '20px',
    sortable: true,
  } ,
  {
    name: 'sensor_13',
    selector: (row) => row.sensor_13,
    maxWidth: '20px',
    sortable: true,
  } ,
  {
    name: 'sensor_14',
    selector: (row) => row.sensor_14,
    maxWidth: '20px',
    sortable: true,
  } ,
  {
    name: 'sensor_15',
    selector: (row) => row.sensor_15,
    maxWidth: '20px',
    sortable: true,
  },
  {
    name: 'sensor_16',
    selector: (row) => row.sensor_16,
    maxWidth: '20px',
    sortable: true,
  },
  {
    name: 'sensor_17',
    selector: (row) => row.sensor_17,
    maxWidth: '20px',
    sortable: true,
  } ,
  {
    name: 'sensor_18',
    selector: (row) => row.sensor_18,
    maxWidth: '20px',
    sortable: true,
  } ,
  {
    name: 'sensor_19',
    selector: (row) => row.sensor_19,
    maxWidth: '20px',
    sortable: true,
  } ,
  {
    name: 'sensor_20',
    selector: (row) => row.sensor_20,
    maxWidth: '20px',
    sortable: true,
  },
  {
    name: 'sensor_21',
    selector: (row) => row.sensor_21,
    maxWidth: '20px',
    sortable: true,
  },
  {
    name: 'cluster',
    selector: (row) => row.cluster,
    maxWidth: '20px',
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

const AdminDataProcessed = () => {

  const [dataTableRaw, setDataTableRaw] = useState(data);

  
  const get_table_groupby = async () => {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_API_URL}/api/dashboard_admin/admin_dataprocessed`,
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

export default AdminDataProcessed;
