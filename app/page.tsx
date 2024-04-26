'use client'
import React, { useEffect, useState } from 'react'
import GetRecent from './components/GetRecent'
import Checkin from './components/Checkin'
import Checkout from './components/Checkout'
import { endpoints } from '@/GlobalConstants'

const Page = () => {
  const [status, setStatus] = useState(false);
  useEffect(() =>
  {
    async function getStatus()
    {
      const url = endpoints.mileage.status;
      const response = await fetch(url, {method: 'GET'});
      if(!response.ok)
      {
        throw new Error('Network response was not ok')
      }
      const info = await response.json();
      setStatus(info);
    }
    getStatus();
    console.log(status);
  },[status])
  return (
    <>
    <div className="container mx-auto p-4 space-y-6">
      <GetRecent />
      {!status && (
        <Checkin />
      )}
      {status && (
        <Checkout />
      )}
    </div>
    </>
  )
}

export default Page