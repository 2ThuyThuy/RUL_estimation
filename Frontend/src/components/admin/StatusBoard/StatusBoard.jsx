import React from 'react';
import { RiCheckboxCircleLine } from 'react-icons/ri';
import { RiShoppingBag3Line } from 'react-icons/ri';
import './statusBoard.scss';

function StatusBoard({ number, title, icon }) {
  return (
    <div className="status-board">
      <div className="icon">
        {icon === 'customers' && (
          <RiCheckboxCircleLine className="inside-icon" />
        )}
        {icon === 'products' && <RiShoppingBag3Line className="inside-icon" />}
      </div>
      <div className="right">
        <div className="num"> {number}</div>
        <div className="title">{title}</div>
      </div>
    </div>
  );
}

export default StatusBoard;
