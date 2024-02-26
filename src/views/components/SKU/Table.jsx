import React, { useState } from 'react';
import './SkuTables.css';
import { right } from '@popperjs/core';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
const DynamicTable = () => {
  const [tableData, setTableData] = useState([
    {
      id: 1,
      name: 'Laptop',
      asin: 25,
      sku: 12,
      quantity: 123,
      holdquntity: 44,
    },
    {
      id: 2,
      name: 'Desktop',
      asin: 11,
      sku: 5,
      quantity: 22,
      holdquntity: 273,
    },
    {
      id: 3,
      name: 'Monitor',
      asin: 1,
      sku: 66,
      quantity: 55,
      holdquntity: 66,
    },
  ]);

  return (
    <table className='table-sku-style'>
      <thead>
        <tr>
          <th>#ID</th>
          <th>Name</th>
          <th>ASIN</th>
          <th>SKU</th>
          <th>Total Quantity</th>
          <th>Hold Quantity</th>
        </tr>
      </thead>
      <tbody className='sku-body-table'>
        {tableData.map(row => (
          <tr key={row.id}>
            <td>{row.id}</td>
            <td>{row.name}</td>
            <td>{row.asin}</td>
            <td>{row.sku}</td>
            <td>{row.quantity}</td>
            <td>{row.holdquntity}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DynamicTable;
