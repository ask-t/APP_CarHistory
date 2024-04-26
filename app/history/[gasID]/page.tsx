'use client'
import React, { useEffect, useState } from 'react';
import { endpoints } from '@/GlobalConstants'
import { format, parseISO } from 'date-fns';

const Page = ({ params }: { params: { gasID: string } }) => {
  const [ data, setData ] = useState([]);
  useEffect(() =>
  {
    async function getData()
    {
      const url = `${endpoints.gasInfo.specific}/${params.gasID}`;
      console.log(url);
      const response = await fetch(url,{ method: 'GET'});
      if(!response.ok)
      {
        throw new Error(`Network response was not ok in ${url}`);
      }
      const info = await response.json();
      setData(info);
    }
    getData();
  },[params.gasID])

  function goBack()
  {
    window.location.href='/history'
  }
  return (
    <div className="container mx-auto p-4 space-y-4">
      <h1 className="text-xl font-bold text-gray-800">Gas Info for {params.gasID}</h1>
      <button
        onClick={goBack} // Navigate back to the previous page
        className="text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-4"
      >
        Back
      </button>
      <ul className="space-y-4">
        {data.map((item: any) => (
          <li key={item._id} className="bg-white p-4 rounded-md shadow-sm hover:bg-gray-50">
            <strong className="text-indigo-600">{item._id}</strong>
            <p>Start Mile: {item.from}</p>
            <p>End Mile: {item.to}</p>
            <p>Miles: {item.miles}</p>
            <p>Cost: {item.cost}</p>
            <p>Start Time: {format(parseISO(item.startDate), 'MM/dd HH:mm')}</p>
            <p>End Time: {format(parseISO(item.endDate), 'MM/dd HH:mm')}</p>
            <p>User: {item.user}</p>
            <p>Description: {item.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Page