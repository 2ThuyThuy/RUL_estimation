import { Line } from 'react-chartjs-2';
import { Pie } from 'react-chartjs-2';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Aside from '../../components/user/Aside/Aside';
import StatusBoard from '../../components/admin/StatusBoard/StatusBoard';
import { options, data } from '../../config/lineChart';
import { barOptions, barData } from '../../config/stackedBarChart';
import { pieData } from '../../config/pieChart';
import Header from '../../components/Header/Header';
import HeaderUser from "../../components/HeaderUser/HeaderUser"

import './userDashboard.scss'

const UserDashboard = () => {

  return (
    <div className="user-dashboard">
       <HeaderUser backgroundHeader='#3C6DCD' nameUser={"ThuyThuy"} />
      <Aside />
      <div className="container">
        <div className="line-chart">
          <Line options={options} data={data} />
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
          <div className="export">Export</div>
        </div>
        <div className="title">Estimate Remaining Useful Life</div>
        <div className="number">50</div>
        <div className="">Remaining days</div>
        <div className="today">12/02</div>
        <div className="reliable_percent">
          <div className="percentage">85%</div>
          <div>Reliability</div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
