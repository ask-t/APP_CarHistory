import React, { useEffect, useState } from 'react'
import {endpoints} from '@/GlobalConstants'

const Checkin = () => {
  async function checkin()
  {
    const url = endpoints.mileage.checkin;
    const response = await fetch(url, {method: 'GET'});
    if(!response.ok)
    {
      throw new Error("Network response was not ok");
    }
    window.location.href = "/";
  }
  return (
    <div className="bg-white p-4 rounded-md shadow-sm">
      <h2 className="text-lg font-bold text-gray-800">Check-In</h2>
      <button
        onClick={checkin}
        className="mt-2 text-white bg-green-500 hover:bg-green-700 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5"
      >
        Check-In
      </button>
    </div>
  );
}

export default Checkin