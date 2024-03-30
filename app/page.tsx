'use client'
import React, { useState } from 'react';

const Page = () => {
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const base = "https://api-car-history-nu.vercel.app/";

  const checkIN = async () => {
    setIsCheckedIn(true);
    const endpoint = "mileage/checkin";
    setIsLoading(true);
    try {
      const response = await fetch(`${base}${endpoint}`, { method: 'GET' });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error('Failed to fetch data:', error);
      // Optionally, handle the error in UI as well
    } finally {
      setIsLoading(false);
    }
  };

  const checkOUT = async () => {
    setIsCheckedIn(false);
    const endpoint = "mileage/checkout";
    setIsLoading(true);
    const response = await fetch(
      `${base}${endpoint}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(
        {
          "to": 0,
          "gas": true,
          "totalCost": 0
        }
      ),

    }
    );
    const jsonData = await response.json();
    setData(jsonData);
    setIsLoading(false);
  }

  async function fetchData() {
    try {
      const endpoint = "mileage/all";
      const response = await fetch(`${base}${endpoint}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log(data);
      setData(data);
    } catch (error) {
      console.error('Failed to fetch data:', error);
      // Handle error
    }
  }
  const handleCheckIn = () => {
    setIsCheckedIn(true);
    // Implement check-in logic here
  };


  return (
    <div className="flex justify-center items-center h-screen">
      {!isCheckedIn ? (
        <button
          onClick={checkIN}
          className="text-white bg-green-500 hover:bg-green-700 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >
          Check-In
        </button>
      ) : (
        <button
          onClick={checkOUT}
          className="text-white bg-red-500 hover:bg-red-700 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
        >
          Check-Out
        </button>
      )}

      <button
        onClick={fetchData}
        className="text-white bg-red-500 hover:bg-red-700 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
      >
        GetALL
      </button>

      {data && (
        <div className="mt-3">
          <h2>Response Data:</h2>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}

    </div>
  )
}

export default Page
